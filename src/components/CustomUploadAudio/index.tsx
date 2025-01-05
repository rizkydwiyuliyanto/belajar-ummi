import { useRef, useState } from 'react';

const index = (props: { name: string; label: string; id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<HTMLSpanElement | any>();

  return (
    <>
      <div
        style={{
          width: '100%',
          // flex: '1 1 auto',
          borderRadius: '4px',
          position: 'relative',
          height: "122px",
          overflow: 'hidden',
          backgroundColor: '#EBEDF7',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            top: '0',
            zIndex: '2',
            left: '0',
            position: 'absolute',
          }}
        >
          <input
            type="file"
            accept={'audio/*'}
            name={props.name}
            hidden
            id={'actual-btn'}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const { files }: { files: any } = e.target;
              console.log(files);
              const uri = URL.createObjectURL(files[0]);
              setLoading(false);
              setSrc(uri);
            }}
          />
          <label htmlFor="actual-btn">{props.label}</label>
        </div>
      </div>
      {loading ? (
        <span ref={textRef}></span>
      ) : (
        <>
          {src && (
            <div
              style={{
                // top: '0',
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: "#546FFF",
                // left: '0',
                marginTop: "12px"
                // position: 'absolute',
              }}
            >
              <audio controls>
                <source src={src} type={"audio/mpeg"} />
              </audio>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default index;
