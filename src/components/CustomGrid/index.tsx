const index = (props: { children: React.ReactNode }) => {
    return (
        <div
            style={{
                display: "grid",
                rowGap:"27px",
                columnGap:"25px",
                padding:"1.5em",
                justifyContent:"center",
                // backgroundColor:"#F5F5F7",
                borderRadius:"6px",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 0fr))"
            }}
        >
            {props.children}
        </div>
    )
};

export default index;