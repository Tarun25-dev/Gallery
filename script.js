let currentIndex = 0;
        let touchStartX = 0;

        // GENERATE GALLERY FROM ARRAY
        function createGallery() {
            const gallery = document.getElementById('masonry-gallery');
            gallery.innerHTML = ''; // Clear existing
            
            imagePaths.forEach((src, index) => {
                const container = document.createElement('div');
                container.className = 'image-container';
                container.onclick = () => openLightbox(index);
                
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Photo ${index + 1}`;
                img.loading = 'lazy';
                
                container.appendChild(img);
                gallery.appendChild(container);
            });
        }

        function openLightbox(index) {
            currentIndex = index;
            document.getElementById('lightbox-img').src = imagePaths[index];
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % imagePaths.length;
            document.getElementById('lightbox-img').src = imagePaths[currentIndex];
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
            document.getElementById('lightbox-img').src = imagePaths[currentIndex];
        }

        // Keyboard
        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('lightbox').classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') prevImage();
            else if (e.key === 'ArrowRight') nextImage();
        });

        // Swipe
        document.getElementById('lightbox-bg').addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });

        document.getElementById('lightbox-bg').addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) nextImage();
                else prevImage();
            }
        });

        // LOAD GALLERY ON PAGE LOAD
        window.addEventListener('load', createGallery);