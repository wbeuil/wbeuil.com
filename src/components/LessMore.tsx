const LessMore: React.FC = () => (
  <div
    className='flex flex-row items-center text-xs'
    style={{ color: '#9ca3af' }}>
    <span className='mr-1'>Less</span>
    <svg width='62' height='10'>
      <rect width='10' height='10' x='0' y='0' rx='2' ry='2' data-level='0' />
      <rect width='10' height='10' x='13' y='0' rx='2' ry='2' data-level='1' />
      <rect width='10' height='10' x='26' y='0' rx='2' ry='2' data-level='2' />
      <rect width='10' height='10' x='39' y='0' rx='2' ry='2' data-level='3' />
      <rect width='10' height='10' x='52' y='0' rx='2' ry='2' data-level='4' />
    </svg>
    <span className='ml-1'>More</span>
  </div>
);

export default LessMore;
