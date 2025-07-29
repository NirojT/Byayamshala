const customStyles = {
    control: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      backgroundColor: 'black',
      borderColor: state.isFocused ? '#E26003' : '#6b7280',
      boxShadow: state.isFocused ? '0 0 0 1px #E26003' : null,
      padding: '0.30rem',
      borderRadius: '0.375rem',
      outline: 'none',
      width: '100%',
      marginTop:"7px"
    }),
    option: (provided: any, state: { isSelected: any; }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#E26003' : '',
      color: 'white',
      padding: '0.5rem',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'black',
      borderRadius: '0.375rem',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
  };

export default customStyles;

  export const muiStyles = {
    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "1rem",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 6px 30px 0 rgba(50,50,93,0.04)",
        backdropFilter: "blur(8px)",
        transition: "box-shadow 0.3s",
        "&:hover fieldset": {
          borderColor: "#e26300",
          boxShadow: "0 1px 20px 0 #e2630066",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#e26300",
          borderWidth: "2px",
        },
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#e26300",
      },
    },
    select: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "1rem",
        background: "rgba(255,255,255,0.75)",
        boxShadow: "0 6px 30px 0 rgba(50,50,93,0.04)",
        backdropFilter: "blur(8px)",
        "&:hover fieldset": {
          borderColor: "#e26300",
          boxShadow: "0 1px 20px 0 #e2630066",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#e26300",
          borderWidth: "2px",
        },
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#e26300",
      },
    },
  };