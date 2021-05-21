import useRepos from 'hooks/useRepos';
import Repo from 'icons/repo.svg';
import Circle from 'icons/circle.svg';
import Stars from 'icons/stars.svg';
import Forks from 'icons/forks.svg';

const LoadingRepo: React.FC = () => (
  <li className='w-full md:w-1/2 md:px-2 mb-4 animate-pulse'>
    <div className='flex flex-col p-4 rounded-md border-solid border border-gray-200 dark:border-gray-800'>
      <div
        className='flex flex-row items-center mb-2'
        style={{ paddingTop: '2px', paddingBottom: '2px' }}>
        <Repo
          width={16}
          height={16}
          aria-hidden
          className='text-gray-400 mr-2'
        />
        <div className='h-2 bg-gray-200 dark:bg-gray-800 rounded w-1/4' />
      </div>
      <div className='h-2 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mt-1 mb-5' />
      <div className='flex flex-row items-center'>
        <span className='flex flex-row items-center text-gray-400 mr-4'>
          <div
            aria-hidden
            style={{ width: '12px', height: '12px' }}
            className='rounded-full bg-gray-200 dark:bg-gray-800 mr-1'
          />
          <div className='h-2 bg-gray-200 dark:bg-gray-800 rounded w-12 my-1' />
        </span>
        <span className='flex flex-row items-center text-gray-400'>
          <Stars width={16} height={16} aria-hidden className='mr-1' />
          <div className='h-2 bg-gray-200 dark:bg-gray-800 rounded w-12 my-1' />
        </span>
        <span className='flex flex-row items-center text-gray-400 ml-4'>
          <Forks width={16} height={16} aria-hidden className='mr-1' />
          <div className='h-2 bg-gray-200 dark:bg-gray-800 rounded w-12 my-1' />
        </span>
      </div>
    </div>
  </li>
);

const Repos: React.FC = () => {
  const { data, isLoading } = useRepos();

  return (
    <ol className='flex w-full flex-wrap' style={{ maxWidth: '900px' }}>
      {isLoading &&
        Array(4)
          .fill('loading')
          .map((_, i) => <LoadingRepo key={i} />)}
      {!isLoading &&
        data?.repos?.viewer?.pinnedItems?.nodes?.map((repo) => (
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
                  className='font-medium px-1 text-sm text-blue-400 rounded hover:underline focus:outline-none focus:ring-2'
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
                    <Stars
                      width={16}
                      height={16}
                      aria-hidden
                      className='mr-1'
                    />
                    {repo.stargazerCount}
                  </span>
                )}
                {repo.forkCount > 0 && (
                  <span className='flex flex-row items-center text-xs text-gray-400 ml-4'>
                    <Forks
                      width={16}
                      height={16}
                      aria-hidden
                      className='mr-1'
                    />
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
