const useBankFormat = () => {
[
    {
      "type": "banks",
      "id": "1",
      "attributes": {
        "name": "Interbank",
        "format": "3,10"
      }
    },
    {
      "type": "banks",
      "id": "2",
      "attributes": {
        "name": "BBVA Banco Continental",
        "format": "4,4,10"
      }
    },
    {
      "type": "banks",
      "id": "3",
      "attributes": {
        "name": "Banco de Crédito",
        "format": "3,8,1,2"
      }
    }
  ]
    const formatAccount = (format) => {
        if (format === '3,10') {
            return '999-9999999999'
          } else if (format === '4,4,10') {
            return '9999-9999-9999999999'
          } else if (format === '3,8,1,2') {
            return '999-99999999-9-99'
          } else {
            return ''
          }
      };

  return {
    formatAccount
  };
};

export default useBankFormat;
