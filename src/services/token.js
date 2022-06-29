const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchToken;
