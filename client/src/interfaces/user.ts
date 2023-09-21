export default interface User {
  _id?: number;
  name?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
  };
  phone?: string;
  email: string;
  password: string;
  image?: {
    imageURL?: string;
    imageAlt?: string;
  };
  gender?: string;
  role?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
  };
  // zipCode?: string;
  favCards?: number[];
}
