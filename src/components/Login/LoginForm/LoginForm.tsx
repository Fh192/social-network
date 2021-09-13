import React from 'react';
import styles from './LoginForm.module.css';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import EmailIcon from '../../../svg/EmailIcon';
import PasswordIcon from '../../../svg/PasswordIcon';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';
import { login } from '../../../store/reducers/authReducer';
import { IAuthLogin } from '../../../types/auth';

interface MapStateProps {
  captcha: string;
  serverErrors: Array<string>;
}
interface MapDispatchProps {
  login: (loginFormData: IAuthLogin) => void;
}

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

const LoginValidationSchema = yup.object().shape({
  email: yup.string().email('Incorrect email').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean(),
  captcha: yup.string(),
});

type Props = MapStateProps & MapDispatchProps;

const LoginForm: React.FC<Props> = ({ captcha, serverErrors, login }) => {
  if (serverErrors.length > 0) {
    setTimeout(() => {
      console.log(serverErrors);
    }, 3000);
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
      }}
      validationSchema={LoginValidationSchema}
      onSubmit={(values: FormValues) => {
        login(values);
      }}
    >
      {({ errors, touched, setValues }) => (
        <Form className={styles.form}>
          <label className={styles.inner} htmlFor='email'>
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}

            <div className={`${styles.field} ${styles.email}`}>
              <EmailIcon size='20px' color='#fff' />
              <Field id='email' name='email' type='email' placeholder='Email' />
            </div>
          </label>

          <label className={styles.inner} htmlFor='password'>
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
            <div className={`${styles.field} ${styles.password}`}>
              <PasswordIcon size='20px' color='#fff' />

              <Field
                id='password'
                name='password'
                type='password'
                placeholder='Password'
              />
            </div>
          </label>

          <div className={`${styles.field} ${styles.checkbox}`}>
            <Field name='rememberMe' type='checkbox' id='rememberMe' />
            <label htmlFor='rememberMe'>Remember</label>
          </div>
          {captcha && (
            <div className={`${styles.field} ${styles.captcha}`}>
              <Field name='captcha' type='text' placeholder='Enter captcha' />
              <img src={captcha} alt='captcha' />
            </div>
          )}

          <button
            className={`${styles.loginBtn} ${
              serverErrors.length > 0 && styles.errorColor
            }`}
            type='submit'
            disabled={
              serverErrors.length > 0 || Object.values(errors).length > 0
            }
          >
            {serverErrors.length > 0 && touched ? serverErrors[0] : 'Login'}
          </button>
          <div className={styles.templateAccount}>
            <span
              onClick={() => {
                setValues({
                  email: 'free@samuraijs.com',
                  password: 'free',
                  rememberMe: false,
                  captcha: '',
                });
              }}
            >
              Use template account
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: RootState): MapStateProps => ({
  captcha: state.auth.captcha,
  serverErrors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(LoginForm);
