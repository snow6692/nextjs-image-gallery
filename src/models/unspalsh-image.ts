export interface IUspalshImage {
  description: string;
  user: {
    username: string;
  };

  urls: {
    raw: string;
  };
  width: number;
  height: number;
  
}

export interface IUnsplashSearchResponse {
  results:IUspalshImage[]
}