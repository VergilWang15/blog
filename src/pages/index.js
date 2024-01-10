import { useEffect } from 'react'; // 导入 useEffect

export default function Home() {
  // 使用 useEffect 进行页面跳转
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/blog/devs-log';
    }, 200); // 延迟0.2秒后跳转，以便显示加载界面
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src="img/loading.webp" alt="Loading" style={{ width: '600px' }} />
      <p style={{ fontSize: '20px', color: '#333', fontStyle: 'italic', marginTop: '20px' }}>Loading...</p>
    </div>
  );
}
