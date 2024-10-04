// import { useState, useEffect } from 'react';

// const usePreloadImages = (imageUrls) => {
//     const [imagesLoaded, setImagesLoaded] = useState(false);

//     useEffect(() => {
//         let imagesToLoad = imageUrls.length;
//         const handleImageLoad = () => {
//             imagesToLoad -= 1;
//             if (imagesToLoad === 0) {
//                 setImagesLoaded(true);
//             }
//         };

//         imageUrls.forEach((url) => {
//             const img = new Image();
//             img.src = url;
//             img.onload = handleImageLoad;
//             img.onerror = handleImageLoad;
//         });
//     }, [imageUrls]);

//     return imagesLoaded;
// };

// export default usePreloadImages;
