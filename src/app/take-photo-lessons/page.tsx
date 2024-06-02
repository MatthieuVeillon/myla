import React from 'react';
import Webcam from 'react-webcam';

const MobilePage = () => {
    const webcamRef = React.useRef(null);
    const [showCamera, setShowCamera] = React.useState(false);
    const [capturedImages, setCapturedImages] = React.useState([]); // State to store captured images

    const handleButtonClick = () => {
        setShowCamera(true);
    };

    const capture = () => {
        // Access the webcam using the webcamRef and capture the photo

        //@ts-ignore
        const imageSrc = webcamRef.current.getScreenshot();
        // Check if the number of captured images is less than 10 before adding a new image
        if (capturedImages.length < 10) {
            // Update state with captured images
            //@ts-ignore
            setCapturedImages([...capturedImages, imageSrc]);
        }
    };

    // Function to toggle camera view
    const toggleCamera = () => {
        setShowCamera((prev) => !prev);
        if (!showCamera) {
            setCapturedImages([]); // Reset captured images when camera view is toggled
        }
    };
    const videoConstraints = {
        facingMode: {exact: "environment"}
    };
    return (
        <div className="relative flex flex-col h-screen justify-between bg-cover bg-center p-4">
            {/* Display camera when button is clicked */}
            {showCamera ? (
                <>
                    {/*<img src="takePhoto.png" alt="Prend une photo" className="absolute top-5 right-1/2 transform translate-x-1/2 w-52 h-46"/>*/}
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full max-w-md rounded-md overflow-hidden"
                            videoConstraints={videoConstraints}
                        />
                        <div className="flex justify-between mt-4">
                            <button onClick={capture} className="px-4 py-2 bg-blue-500 text-white rounded-md">Prend une
                                photo
                            </button>
                        </div>
                        {/* Display a list of captured images */}
                        <div className="mt-4">
                            {capturedImages.map((image, index) => (
                                <img key={index} src={image} alt={`Captured ${index}`}
                                     className="w-24 h-24 rounded-md shadow-md mr-2 mb-2"/>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Your existing content when camera is not shown */}
                    {/* Top left corner content */}
                    <div className="relative flex items-center space-x-4 p-4 shadow-md">
                        {/* Your SVG */}
                        <span className="text-lg font-semibold">Bienvenue, je suis Myla !</span>
                    </div>

                    {/* Centered content */}
                    <div className="relative flex flex-col justify-center items-center flex-grow">
                        <img src="/hello.png" alt="hello"
                             className="w-75 h-75 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80"/>
                    </div>

                    {/* Bottom centered content */}
                    <h1 className="relative flex flex-col justify-center items-center flex-grow text-2xl font-bold">Prend
                        ton cours en photo !</h1>

                    {/* Bottom centered icon button */}
                    <div className="relative flex justify-center pb-8">
                        <button onClick={handleButtonClick}
                                className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-md backdrop-blur-lg backdrop-brightness-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                            </svg>

                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MobilePage;
