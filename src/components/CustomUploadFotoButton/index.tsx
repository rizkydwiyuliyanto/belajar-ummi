import imageCompression from 'browser-image-compression';
import { useRef, useState } from 'react';

const index = (props: { name: string; label: string; id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const controller = new AbortController();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<HTMLSpanElement | any>();

  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    alwaysKeepResolution: true,
    useWebWorker: true,
    signal: controller.signal,
  };
  return (
    <>
      <div
        style={{
          width: '100%',
          flex: '1 1 auto',
          height:"100%",
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#EBEDF7',
        }}
        onMouseEnter={() => {
          if (src) {
            setShowButton(true);
          }
        }}
        onMouseLeave={() => {
          if (src) {
            setShowButton(false);
          }
        }}
      >
        {loading ? (
          <span ref={textRef}></span>
        ) : (
          <>
            {src && (
              <img
                alt={`${props.id}`}
                src={src}
                style={{
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  position: 'absolute',
                  objectFit: 'cover',
                }}
              />
            )}
          </>
        )}
        <div
          style={{
            display: 'flex',
            backgroundColor: src ? '#0000004d' : 'inherit',
            width: '100%',
            opacity: !loading && showButton ? '1' : '0',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            top: '0',
            zIndex: '10',
            left: '0',
            position: 'absolute',
          }}
          className={'showFormButton'}
        >
          <input
            type="file"
            accept={'image/*'}
            name={props.name}
            hidden
            id={'actual-btn'}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { files }: { files: any } = e.target;
              console.log(files);
              const fileUploading = async () => {
                setLoading(true);
                try {
                  const compressedFile = await imageCompression(files[0], {
                    ...options,
                    onProgress: (prog) => {
                      textRef.current.innerText = `Loading ${prog}%...`;
                    },
                  });
                  const uri = URL.createObjectURL(compressedFile);
                  setLoading(false);
                  setShowButton(false);
                  setSrc(uri);
                } catch (err) {
                  console.log(err);
                }
              };
              fileUploading();
            }}
          />
          <label htmlFor="actual-btn">{props.label}</label>
        </div>
      </div>
    </>
  );
};

export default index;
