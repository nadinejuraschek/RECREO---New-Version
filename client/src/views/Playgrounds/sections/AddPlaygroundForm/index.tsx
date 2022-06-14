// DEPENDENCIES
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// COMPONENTS
import { Button, Form, Input, Modal, Selecter } from 'components';

// DATA
import { features } from 'data';

// STYLED COMPONENTS
import {
  // MultipleInputWrapper,
  PlaygroundWrapper,
} from '../../styles/AddPlaygroundForm';

// SCHEMA
import { playgroundSchema } from 'schemas';

// CONTEXT
import { PlaygroundContext } from 'context/PlaygroundContext';

// INTERFACES
import { AddPlaygroundInputs, AddPlaygroundFormProps } from '../../types';

export const AddPlaygroundForm = ({ setOpenAddPlaygroundModal }: AddPlaygroundFormProps): JSX.Element => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>();
  const { addPlayground } = useContext(PlaygroundContext);

  const defaultValues = {
    description: '',
    location: '',
    // lat: 0.000001,
    // long: 0.000001,
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddPlaygroundInputs>({
    defaultValues,
    resolver: yupResolver(playgroundSchema),
    mode: 'onChange',
  });

  const onSubmit = (formData: AddPlaygroundInputs): void => {
    if (addPlayground) addPlayground({ ...formData, features: selectedFeatures });
  };

  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <Modal
        closeButton
        footer={
          <Button $disabled={!isValid || isSubmitting} $filled loading={isSubmitting} $small type="submit">
            Add Playground
          </Button>
        }
        title="New Playground"
        toggleModal={setOpenAddPlaygroundModal}
      >
        <PlaygroundWrapper>
          <Input label="Name" name="name" placeholder="Name" type="text" register={register} error={errors?.name?.message} />
          <Input
            label="Location"
            name="location"
            placeholder="Location"
            type="text"
            register={register}
            error={errors?.location?.message}
          />
          {/* <MultipleInputWrapper>
            <Input
              label="Latitude"
              name="lat"
              placeholder="Latitude"
              step="0.000001"
              type="number"
              register={register}
              error={errors?.lat?.message}
            />
            <Input
              label="Longitude"
              name="long"
              placeholder="Longitude"
              step="0.000001"
              type="number"
              register={register}
              error={errors?.long?.message}
            />
          </MultipleInputWrapper> */}
          <Input
            label="Description"
            name="description"
            placeholder="Description"
            type="textarea"
            register={register}
            error={errors?.description?.message}
          />
          <Selecter handleChange={setSelectedFeatures} label="Features" options={features} placeholder="Features" />
          {/* IMAGE UPLOAD HERE */}
        </PlaygroundWrapper>
      </Modal>
    </Form>
  );
};
