const useInputValidators = () => {

    const handleOnlyNumbers = (event) => {
        const regex = /^[0-9\b]+$/;
        const value = event.target.value;
        if (!regex.test(value)) {
          const filteredValue = value
            .split('')
            .filter((char) => regex.test(char))
            .join('');
          event.target.value = filteredValue;
        }
      };
    
      const handleOnlyCharacters = (event) => {
        const regex = /^[A-Za-z\s]*$/;
        const value = event.target.value;
        if (!regex.test(value)) {
          const filteredValue = value
            .split('')
            .filter((char) => regex.test(char))
            .join('');
          event.target.value = filteredValue;
        }
      };

      const handleOnlyEmail = (event) => {
        return /\S+@\S+\.\S+/.test(event.target.value);
      };
  return {
    handleOnlyNumbers,
    handleOnlyCharacters,
    handleOnlyEmail,
  };
};

export default useInputValidators;
