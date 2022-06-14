import Loader from 'components/fullPageLoading';
import Input from 'components/web/form/inputCommon/inputText';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { resetPassword } from 'slice/userSlice';
function Index() {
  const forgetPasswordForm = useForm({
    defaultValues: {
      email: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const action = resetPassword({ "email": values.email });
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Loader showLoader={loading} />
      <form className="form-horizontal" onSubmit={forgetPasswordForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <Input name="email" form={forgetPasswordForm} placeholder="Địa chỉ E-sssmail *" />
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_changepassword">
              Xác nhận
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default Index;
