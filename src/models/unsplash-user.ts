export default interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}
