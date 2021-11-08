import classNames from 'classnames/bind';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { ReloadIcon } from '../../svg/ReloadIcon';
import styles from './Login.module.css';
import loginPageImg from '../../assets/loginPage.svg';
import Preloader from '../Preloader/Preloader';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { getCaptcha, login } from '../../store/reducers/authReducer';
import { IAuthLogin } from '../../types/auth';
import * as yup from 'yup';
import emailIcon from '../../assets/email.png';
import padlockIcon from '../../assets/padlock.png';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const { captcha, loginError, captchaFetching } = useSelector(s => s.auth);
  const [animateReRequestCaptcha, setAnimateReRequestCaptcha] = useState(false);

  const initialFormValues = {
    email: '',
    password: '',
    captcha: '',
    rememberMe: true,
  } as IAuthLogin;

  const validationSchema = yup.object().shape({
    email: yup.string().email('Incorrect email').required('Email is required'),
    password: yup.string().required('Password is required'),
    captcha: captcha
      ? yup.string().required('Captcha is required')
      : yup.string(),
    rememberMe: yup.boolean().required(),
  });

  const reRequestCaptchaHandler = () => {
    setAnimateReRequestCaptcha(true);
    dispatch(getCaptcha());
  };

  const submitHandler = async (values: IAuthLogin) => {
    dispatch(login(values));
  };

  return (
    <div className={cx(['login'])}>
      <div className={cx(['formWrap'])}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({
            errors,
            setFieldValue,
            setFormikState,
            isValid,
            isSubmitting,
          }) => (
            <Form className={cx(['form'])}>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor='email' className={cx(['label'])}>
                  Email
                </label>
                <div className={cx(['field'])}>
                  {errors.email && (
                    <div className={cx(['error'])}>
                      <span>{errors.email}</span>
                    </div>
                  )}

                  <div className={cx(['icon'])}>
                    <img src={emailIcon} alt='email' />
                  </div>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                  />
                </div>
              </div>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor='password' className={cx(['label'])}>
                  Password
                </label>
                <div className={cx(['field'])}>
                  {errors.password && (
                    <div className={cx(['error'])}>
                      <span>{errors.password}</span>
                    </div>
                  )}
                  <div className={cx(['icon'])}>
                    <img src={padlockIcon} alt='padlock' />
                  </div>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                  />
                </div>
              </div>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor='captcha' className={cx(['label'])}>
                  Captcha
                </label>
                <div className={cx(['captcha'])}>
                  <div className={cx(['field', 'captchaImg'])}>
                    {captchaFetching ? (
                      <Preloader size='30px' color='#0116CB' />
                    ) : (
                      captcha && <img src={captcha} alt='captcha' />
                    )}

                    <button
                      className={cx(['reRequestCaptcha'])}
                      onClick={() => {
                        reRequestCaptchaHandler();
                        setFieldValue('captcha', '');
                      }}
                      disabled={captchaFetching || !captcha}
                    >
                      <div
                        className={cx({ icon: true, animateReRequestCaptcha })}
                        onAnimationEnd={() => setAnimateReRequestCaptcha(false)}
                      >
                        <ReloadIcon size='20px' />
                      </div>
                    </button>
                  </div>
                  <div className={cx(['field'])}>
                    {errors.captcha && (
                      <div className={cx(['error'])}>
                        <span>{errors.captcha}</span>
                      </div>
                    )}
                    <Field
                      type='text'
                      name='captcha'
                      id='captcha'
                      placeholder='Captcha'
                      disabled={captchaFetching || !captcha}
                    />
                  </div>
                </div>
              </div>
              <div className={cx(['fieldWrap', 'remember'])}>
                <div className={cx(['field'])}>
                  <Field type='checkbox' name='rememberMe' id='rememberMe' />
                </div>
                <label htmlFor='rememberMe' className={cx(['label'])}>
                  Remember
                </label>
              </div>

              <button
                className={cx(['submitBtn'])}
                type='submit'
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Preloader size='30px' color='#D4D8FF' />
                ) : (
                  loginError || 'Login'
                )}
              </button>
              <div className={cx(['templateAcc'])}>
                <button
                  type='button'
                  onClick={() => {
                    setFormikState(prevState => ({
                      ...prevState,
                      values: {
                        ...prevState.values,
                        email: 'free@samuraijs.com',
                        password: 'free',
                      },
                    }));
                  }}
                >
                  Use template account
                </button>
                <button type='button'>
                  <a
                    href='https://social-network.samuraijs.com/signUp'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Create account
                  </a>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={cx(['view'])}>
        <img src={loginPageImg} alt='' />
      </div>
    </div>
  );
};

export default Login;
