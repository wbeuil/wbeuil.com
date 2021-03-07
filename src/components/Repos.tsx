import useSWR from 'swr';

import fetcher from 'utils/fetcher';
import Repo from 'icons/repo.svg';
import Circle from 'icons/circle.svg';
import Stars from 'icons/stars.svg';
import Forks from 'icons/forks.svg';

const Repos: React.FC = () => {
  const { data } = useSWR<ReposData>('/api/github/repos', fetcher);

  return (
    <ol className='flex w-full flex-wrap' style={{ maxWidth: '900px' }}>
      {data?.repos?.viewer?.pinnedItems?.nodes?.map((repo) => (
        <li key={repo.id} className='w-full md:w-1/2 md:px-2 mb-4'>
          <div className='flex flex-col p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800'>
            <div className='flex flex-row items-center mb-2'>
              <Repo
                width={16}
                height={16}
                aria-hidden
                className='text-gray-400 mr-2'
              />
              <a
                className='font-medium text-sm text-blue-400 hover:underline'
                rel='noopener noreferrer'
                target='_blank'
                href={repo.url}>
                {repo.owner.login === 'wbeuil' ? (
                  <span>{repo.name}</span>
                ) : (
                  <>
                    <span className='font-normal'>{repo.owner.login}</span>
                    <span>/{repo.name}</span>
                  </>
                )}
              </a>
            </div>
            <p className='text-xs text-gray-400 mb-4'>{repo.description}</p>
            <div className='flex flex-row items-center'>
              <span className='flex flex-row items-center text-xs text-gray-400 mr-4'>
                <Circle
                  width={12}
                  height={12}
                  aria-hidden
                  className='mr-1'
                  style={{ color: repo.primaryLanguage.color }}
                />
                {repo.primaryLanguage.name}
              </span>
              {repo.stargazerCount > 0 && (
                <span className='flex flex-row items-center text-xs text-gray-400'>
                  <Stars width={16} height={16} aria-hidden className='mr-1' />
                  {repo.stargazerCount}
                </span>
              )}
              {repo.forkCount > 0 && (
                <span className='flex flex-row items-center text-xs text-gray-400 ml-4'>
                  <Forks width={16} height={16} aria-hidden className='mr-1' />
                  {repo.forkCount}
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Repos;
