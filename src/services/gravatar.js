import md5 from 'crypto-js/md5';

const getAvatar = (email) => {
  const hash = md5(email).toString();
  const link = `https://www.gravatar.com/avatar/${hash}`;
  return link;
};

export default getAvatar;
