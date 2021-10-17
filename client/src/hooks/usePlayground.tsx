// REACT
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// AXIOS
import axios from 'axios';

// TYPES
import { Playground, Review } from 'types';

interface Props {
  error: string;
  isLoading: boolean;
  playground: Playground | undefined;
  rating: number;
}

export const usePlayground = (id?: string): Props => {
  const { id: paramId } = useParams<{ id: string }>();

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playground, setPlayground] = useState<Playground>();
  const [rating, setRating] = useState<number>(0);

  // GET
  useEffect(() => {
    getSinglePlayground();
  }, []);

  const getSinglePlayground = (): void => {
    setIsLoading(true);
    axios({
      url: `/api/playgrounds/${id || paramId}`,
      method: 'GET',
    })
      .then((res: any): void => {
        const totalRating = getRating(res.data.reviews);
        isNaN(totalRating) ? setRating(0) : setRating(totalRating);
        setPlayground({
          ...res.data,
          rating: isNaN(totalRating) ? 0 : totalRating,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const getRating = (reviews: Review[]): number => {
    const ratings = reviews.map((review) => review.rating);
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum = sum + ratings[i];
    }
    return Math.round(sum / ratings.length);
  };

  return {
    error,
    isLoading,
    playground,
    rating,
  };
};
