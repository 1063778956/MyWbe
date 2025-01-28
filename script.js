document.addEventListener('DOMContentLoaded', function() {
    // 确保页面加载时滚动到顶部
    window.scrollTo(0, 0);
    
    // 平滑滚动处理
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const slider = {
        track: document.querySelector('.slider-track'),
        slides: document.querySelectorAll('.slide'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        pagination: document.querySelector('.slider-pagination'),
        currentIndex: 0
    };

    // 初始化分页点
    slider.slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        slider.pagination.appendChild(dot);
    });

    // 显示当前幻灯片
    function showSlide(index) {
        slider.slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.classList.remove('active');
        });
        slider.slides[index].style.opacity = '1';
        slider.slides[index].classList.add('active');
        
        // 更新分页点
        document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // 切换到指定幻灯片
    function goToSlide(index) {
        slider.currentIndex = index;
        slider.track.style.transform = `translateX(-${index * 100}%)`;
        showSlide(index);
    }

    // 下一张
    function nextSlide() {
        slider.currentIndex = (slider.currentIndex + 1) % slider.slides.length;
        goToSlide(slider.currentIndex);
    }

    // 上一张
    function prevSlide() {
        slider.currentIndex = (slider.currentIndex - 1 + slider.slides.length) % slider.slides.length;
        goToSlide(slider.currentIndex);
    }

    // 绑定按钮事件
    slider.nextBtn.addEventListener('click', nextSlide);
    slider.prevBtn.addEventListener('click', prevSlide);

    // 初始化第一张幻灯片
    showSlide(0);

    // 自动播放
    setInterval(nextSlide, 5000);

    // 滚动效果
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section-fade');
    const advantageItems = document.querySelectorAll('.advantage-item');
    
    // 修改滚动检查函数
    function checkScroll() {
        // 导航栏效果
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 修改元素渐入效果检查
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8;
            
            if (isVisible) {
                section.classList.add('visible');
                
                // 特别处理公司概况部分
                if (section.id === 'about') {
                    const aboutContent = section.querySelector('.about-content');
                    if (aboutContent) {
                        aboutContent.classList.add('visible');
                    }
                    
                    // 处理统计数字部分
                    const statItems = section.querySelectorAll('.stat-item');
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }
            }
        });
        
        // 品牌优势卡片效果
        if (document.querySelector('#advantage').classList.contains('visible')) {
            advantageItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
        }
    }

    // 确保初始检查
    function initVisibility() {
        // 立即显示首屏内容
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('visible');
        }
        
        // 检查当前视口中的内容
        checkScroll();
    }

    // 页面加载完成后执行初始化
    setTimeout(initVisibility, 100);
    
    // 添加滚动监听
    window.addEventListener('scroll', checkScroll);

    // 添加导航高亮功能
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            
            if (rect.top <= 150 && rect.bottom >= 150) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }

    // 添加滚动监听
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // 初始检查

    // 优化高德地图初始化
    function initAMap() {
        const map = new AMap.Map('amap-container', {
            zoom: 18,
            center: [115.955840, 28.643453],
            viewMode: '3D',
            pitch: 45,
            mapStyle: 'amap://styles/fresh',
            skyColor: '#1c77ff'
        });

        // 优化标记点样式
        const marker = new AMap.Marker({
            position: [115.955840, 28.643453],
            title: '非可电竞酒店',
            icon: new AMap.Icon({
                size: new AMap.Size(32, 32),
                imageSize: new AMap.Size(32, 32),
                image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA2NmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjxwYXRoIGQ9Ik0xMiAyYTggOCAwIDAgMC04IDhjMCAxLjg5Mi40MDIgMy4xMyAxLjUgNC41TDEyIDIybDYuNS03LjVjMS4xLTEuMzcgMS41LTIuNjA4IDEuNS00LjVhOCA4IDAgMCAwLTgtOHoiLz48L3N2Zz4=',
            }),
            offset: new AMap.Pixel(-16, -32),
            animation: 'AMAP_ANIMATION_DROP'
        });

        // 优化标签样式
        marker.setLabel({
            content: `
                <div style="
                    background: linear-gradient(135deg, #fff 0%, #f5f8ff 100%);
                    padding: 10px 12px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,102,255,0.1);
                    border: 1px solid rgba(0,102,255,0.2);
                    white-space: nowrap;
                ">
                    <div style="font-weight: 600; font-size: 14px; color: #0066ff;">非可电竞酒店</div>
                </div>
            `,
            direction: 'top',
            offset: new AMap.Pixel(0, -5)
        });

        // 优化信息窗体
        const infoWindow = new AMap.InfoWindow({
            isCustom: true,
            content: `
                <div style="
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                    max-width: 300px;
                ">
                    <h4 style="margin: 0 0 8px; color: #0066ff; font-size: 16px;">非可电竞酒店</h4>
                    <p style="margin: 5px 0; font-size: 13px; color: #333;">
                        <i class="bi bi-geo-alt-fill" style="color: #0066ff; margin-right: 5px;"></i>
                        江西省南昌市青山湖区解放东路2222号
                    </p>
                    <p style="margin: 5px 0; font-size: 13px; color: #333;">
                        <i class="bi bi-telephone-fill" style="color: #0066ff; margin-right: 5px;"></i>
                        18970069331
                    </p>
                </div>
            `,
            offset: new AMap.Pixel(0, -30)
        });

        // 点击标记时显示信息窗体
        marker.on('click', () => {
            infoWindow.open(map, marker.getPosition());
        });

        // 将标记添加到地图
        map.add(marker);

        // 添加必要的控件
        map.addControl(new AMap.Scale({
            position: 'LB'
        }));

        map.addControl(new AMap.ToolBar({
            position: 'RB',
            liteStyle: true
        }));
    }

    // 直接初始化地图，不使用懒加载
    window.onload = function() {
        initAMap();
    };

    // 移动端菜单控制
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // 初始化时确保菜单处于关闭状态
        navLinks.classList.remove('active');
        
        // 移动端导航菜单点击事件
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();  // 阻止事件冒泡
            navLinks.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('bi-list');
                    icon.classList.add('bi-x-lg');
                    document.body.style.overflow = 'hidden';  // 菜单打开时禁止滚动
                } else {
                    icon.classList.add('bi-list');
                    icon.classList.remove('bi-x-lg');
                    document.body.style.overflow = '';  // 菜单关闭时恢复滚动
                }
            }
        });

        // 点击导航链接后关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {  // 修改断点为768px
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('bi-list');
                        icon.classList.remove('bi-x-lg');
                    }
                    document.body.style.overflow = '';  // 恢复滚动
                }
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bi-list');
                    icon.classList.remove('bi-x-lg');
                }
                document.body.style.overflow = '';  // 恢复滚动
            }
        });

        // 处理移动端滑动关闭菜单
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        document.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', () => {
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('bi-list');
                    icon.classList.remove('bi-x-lg');
                }
                document.body.style.overflow = '';
            }
        });
    }

    // 优化移动端滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 移动端触摸优化
    document.addEventListener('touchmove', (e) => {
        if (navLinks.classList.contains('active')) {
            e.preventDefault();  // 菜单打开时阻止滚动
        }
    }, { passive: false });

    // 添加滚动监听器来处理元素的显示
    function handleScroll() {
        const sections = document.querySelectorAll('.section-fade');
        const aboutStats = document.querySelector('.about-stats');
        
        // 处理普通的section-fade元素
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
        
        // 特别处理about-stats
        if (aboutStats) {
            const statsTop = aboutStats.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (statsTop < windowHeight * 0.75) {
                aboutStats.classList.add('visible');
            }
        }
    }

    // 页面加载完成后执行一次
    window.addEventListener('load', handleScroll);
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);

    // 添加体验产品按钮点击事件（如果存在）
    const experienceBtn = document.querySelector('.experience-btn');
    if (experienceBtn) {
        experienceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const experienceSection = document.querySelector('#experience');
            if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 联系卡片控制
    const contactElements = {
        floatingContact: document.querySelector('.floating-contact'),
        contactInfo: document.querySelector('.contact-info'),
        phoneElements: document.querySelectorAll('.contact-item:has(.bi-telephone-fill)'),
        addressElements: document.querySelectorAll('.contact-item:has(.bi-geo-alt-fill)')
    };

    // 添加触控状态追踪
    let isTouching = false;
    let touchTimeout;

    // 优化电话点击处理
    function handlePhoneClick(phoneNumber, event) {
        // 如果是触控事件，且没有完全结束触控状态，则不执行
        if (event.type.startsWith('touch') && isTouching) {
            return;
        }
        
        if (isMobileDevice()) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            copyToClipboard(phoneNumber);
        }
    }

    // 初始化联系卡片事件
    if (contactElements.phoneElements.length > 0) {
        contactElements.phoneElements.forEach(element => {
            element.style.cursor = 'pointer';
            
            // 移除之前的点击事件
            element.removeEventListener('click', handlePhoneClick);
            
            // 添加触控事件处理
            element.addEventListener('touchstart', (e) => {
                isTouching = true;
                // 清除之前的超时
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                }
            });
            
            element.addEventListener('touchend', (e) => {
                e.preventDefault(); // 阻止默认行为
                // 设置一个短暂的延时，确保触控完全结束
                touchTimeout = setTimeout(() => {
                    isTouching = false;
                    handlePhoneClick('18970069331', e);
                }, 100);
            });
            
            // 保留鼠标点击事件（用于PC端）
            element.addEventListener('click', (e) => {
                if (!e.touches) { // 只处理非触控的点击
                    handlePhoneClick('18970069331', e);
                }
            });
        });
    }

    // 优化地址点击处理
    if (contactElements.addressElements.length > 0) {
        contactElements.addressElements.forEach(element => {
            element.style.cursor = 'pointer';
            
            element.addEventListener('touchstart', (e) => {
                isTouching = true;
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                }
            });
            
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                touchTimeout = setTimeout(() => {
                    isTouching = false;
                    handleAddressClick();
                }, 100);
            });
            
            element.addEventListener('click', (e) => {
                if (!e.touches) {
                    handleAddressClick();
                }
            });
        });
    }

    // 添加触控取消处理
    document.addEventListener('touchcancel', () => {
        isTouching = false;
        if (touchTimeout) {
            clearTimeout(touchTimeout);
        }
    });
}); 
