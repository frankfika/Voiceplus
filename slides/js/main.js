document.addEventListener('DOMContentLoaded', () => {
    // 创建漂浮的心形和星星效果
    const createFloatingElement = () => {
        const element = document.createElement('div');
        element.classList.add('heart');
        
        // 随机选择形状：心形或星星
        const shapes = ['♥', '★'];
        element.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        
        // 随机位置和大小
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 15 + 10) + 's';
        element.style.fontSize = (Math.random() * 30 + 10) + 'px';
        
        // 随机颜色
        const colors = [
            'var(--gradient-1)',
            'var(--gradient-2)',
            'var(--gradient-3)'
        ];
        element.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.querySelector('.floating-hearts').appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 25000);
    };

    // 每隔一段时间创建新的漂浮元素
    setInterval(createFloatingElement, 800);

    // 添加鼠标移动视差效果
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const logo = document.querySelector('.logo');
        const slogan = document.querySelector('.slogan');
        
        // Logo的轻微移动
        logo.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
        
        // Slogan的3D效果
        slogan.style.transform = `
            perspective(1000px)
            rotateX(${(mouseY * 10 - 5)}deg)
            rotateY(${(mouseX * 10 - 5)}deg)
        `;
    });

    // 页面切换逻辑
    const nextSlide = () => {
        const nextPage = 'page2-summary.html';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = nextPage;
        }, 500);
    };

    const prevSlide = () => {
        // 在封面页不需要上一页功能
    };

    // 添加键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
}); 