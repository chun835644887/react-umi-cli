import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="rounded-lg md:w-56" src="https://images.unsplash.com" alt="with" />
        </div>
      </div>
      <div className='red'>红色字体</div>
      <div className='text-yellow-500	'>tailwind css 的工具css类 文字颜色</div>
      <div>热更新测试</div>
    </div>
  );
}
