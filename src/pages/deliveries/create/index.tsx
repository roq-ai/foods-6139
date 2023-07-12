import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createDelivery } from 'apiSdk/deliveries';
import { Error } from 'components/error';
import { deliveryValidationSchema } from 'validationSchema/deliveries';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { OrderInterface } from 'interfaces/order';
import { getUsers } from 'apiSdk/users';
import { getOrders } from 'apiSdk/orders';
import { DeliveryInterface } from 'interfaces/delivery';

function DeliveryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DeliveryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDelivery(values);
      resetForm();
      router.push('/deliveries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DeliveryInterface>({
    initialValues: {
      status: '',
      driver_id: (router.query.driver_id as string) ?? null,
      order_id: (router.query.order_id as string) ?? null,
    },
    validationSchema: deliveryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Delivery
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'driver_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<OrderInterface>
            formik={formik}
            name={'order_id'}
            label={'Select Order'}
            placeholder={'Select Order'}
            fetcher={getOrders}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'delivery',
    operation: AccessOperationEnum.CREATE,
  }),
)(DeliveryCreatePage);
