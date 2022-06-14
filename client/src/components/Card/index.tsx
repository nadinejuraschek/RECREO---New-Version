// STYLED COMPONENTS
import { Body, Container, Image, Location, Name } from './styles/Card';

// COMPONENTS
import { AmenitiesList } from '../AmenitiesList';
import { Divider } from '../Divider';
import { Rating } from '../Rating';

// HOOKS
import { usePlayground } from 'hooks/usePlayground';

// INTERFACES
import { CardProps } from './types';

export const Card = ({ id, imageSrc = '', location = '', name = '' }: CardProps): JSX.Element => {
  const { playground, rating } = usePlayground(id);

  return (
    <Container to={`/playgrounds/${id}`}>
      <Image src={imageSrc} alt={name} />
      <Body>
        <Location>{location}</Location>
        <Name>{name}</Name>
        <Divider color="var(--blue__opaque)" />
        <AmenitiesList features={playground?.features || []} small />
        <Rating rating={rating} />
      </Body>
    </Container>
  );
};
