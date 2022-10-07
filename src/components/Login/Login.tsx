import classNames from 'classnames/bind';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import emailIcon from '../../assets/email.png';
import loginPageImg from '../../assets/loginPage.svg';
import padlockIcon from '../../assets/padlock.png';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { getCaptcha, login } from '../../store/reducers/authReducer';
import { ReloadIcon } from '../../svg/ReloadIcon';
import { IAuthLogin } from '../../types/auth';
import Preloader from '../Preloader/Preloader';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const { captcha, loginError, captchaFetching } = useSelector(s => s.auth);
  const [animateReRequestCaptcha, setAnimateReRequestCaptcha] = useState(false);

  const initialFormValues: IAuthLogin = {
    email: '',
    password: '',
    captcha: '',
    rememberMe: true,
  };

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
    await dispatch(login(values));
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
            touched,
            isValid,
            isSubmitting,
            setFieldValue,
            setValues,
          }) => (
            <Form className={cx(['form'])}>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor="email" className={cx(['label'])}>
                  Email
                </label>
                <div className={cx(['field'])}>
                  {touched.email && errors.email && (
                    <div className={cx(['error'])}>
                      <span>{errors.email}</span>
                    </div>
                  )}

                  <div className={cx(['icon'])}>
                    <img src={emailIcon} alt="email" />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor="password" className={cx(['label'])}>
                  Password
                </label>
                <div className={cx(['field'])}>
                  {touched.password && errors.password && (
                    <div className={cx(['error'])}>
                      <span>{errors.password}</span>
                    </div>
                  )}
                  <div className={cx(['icon'])}>
                    <img src={padlockIcon} alt="padlock" />
                  </div>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className={cx(['fieldWrap'])}>
                <label htmlFor="captcha" className={cx(['label'])}>
                  Captcha
                </label>
                <div className={cx(['captcha'])}>
                  <div className={cx(['field', 'captchaImg'])}>
                    {captchaFetching ? (
                      <Preloader size="30px" color="#0116CB" />
                    ) : (
                      captcha && <img src={captcha} alt="captcha" />
                    )}

                    <button
                      className={cx(['reRequestCaptcha'])}
                      disabled={captchaFetching || !captcha}
                      onClick={() => {
                        reRequestCaptchaHandler();
                        setFieldValue('captcha', '');
                      }}
                    >
                      <div
                        className={cx({ icon: true, animateReRequestCaptcha })}
                        onAnimationEnd={() => setAnimateReRequestCaptcha(false)}
                      >
                        <ReloadIcon size="20px" />
                      </div>
                    </button>
                  </div>
                  <div className={cx(['field'])}>
                    {touched.captcha && errors.captcha && (
                      <div className={cx(['error'])}>
                        <span>{errors.captcha}</span>
                      </div>
                    )}
                    <Field
                      type="text"
                      name="captcha"
                      id="captcha"
                      placeholder="Captcha"
                      disabled={captchaFetching || !captcha}
                    />
                  </div>
                </div>
              </div>
              <div className={cx(['fieldWrap', 'remember'])}>
                <div className={cx(['field'])}>
                  <Field type="checkbox" name="rememberMe" id="rememberMe" />
                </div>
                <label htmlFor="rememberMe" className={cx(['label'])}>
                  Remember
                </label>
              </div>
              <button
                className={cx(['submitBtn'])}
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Preloader size="30px" color="#D4D8FF" />
                ) : (
                  loginError || 'Login'
                )}
              </button>
              <div className={cx(['templateAcc'])}>
                <button
                  type="button"
                  onClick={() => {
                    setValues(prev => ({
                      ...prev,
                      email: 'free@samuraijs.com',
                      password: 'free',
                    }));
                  }}
                >
                  Use template account
                </button>
                <button type="button">
                  <a
                    href="https://social-network.samuraijs.com/signUp"
                    target="_blank"
                    rel="noopener noreferrer"
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
        <img src={loginPageImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
