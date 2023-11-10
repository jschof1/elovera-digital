const BackgroundVideo = ({ children }) => {
    const videoStyle = {
        position: 'fixed', // Use fixed or absolute depending on your use case
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1, // Ensures the video stays in the background
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <video autoPlay loop muted style={videoStyle}>
                <source
                    src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            {children}
        </div>
    );
};

export default BackgroundVideo;