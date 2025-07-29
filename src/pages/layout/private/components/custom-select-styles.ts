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
      marginTop:"7px",
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