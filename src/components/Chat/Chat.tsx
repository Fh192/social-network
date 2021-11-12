import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDarkMode, useOnClickOutside } from 'usehooks-ts';
import { CrossIcon } from '../../svg/CrossIcon';
import MessageIcon from '../../svg/MessageIcon';
import styles from './Chat.module.css';
import Message from './Message/Message';
import { IMessage } from '../../types/chat';
import Preloader from '../Preloader/Preloader';

const Chat: React.FC = () => {
  const cx = classNames.bind(styles);

  const ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { isDarkMode } = useDarkMode();

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const toggleOpenStatus = () => {
    setIsChatOpen(v => !v);
  };

  const inputKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue) {
      setInputValue('');
      ws?.send(inputValue);
    }
  };

  useEffect(() => {
    const webSocket = new WebSocket(
      'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    );
    setWs(webSocket);

    return () => webSocket.close();
  }, []);

  useEffect(() => {
    const messageListener = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      setMessages(m => [...m, ...newMessages]);
    };

    ws?.addEventListener('message', messageListener);

    return () => {
      ws?.removeEventListener('message', messageListener);
    };
  }, [ws]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  useOnClickOutside(ref, () => {
    setIsChatOpen(false);
  });

  return (
    <div className={styles.chatWrap} ref={ref}>
      <div
        className={cx({
          chat: true,
          hidden: !isChatOpen,
          chatD: isDarkMode,
        })}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Chat</span>
          </div>
          <div className={styles.close} onClick={toggleOpenStatus}>
            <CrossIcon size='15px' />
          </div>
        </div>

        <div className={styles.messages} ref={messagesRef}>
          {ws ? (
            messages.map((m, i) => {
              return <Message {...m} setIsChatOpen={setIsChatOpen} key={i} />;
            })
          ) : (
            <Preloader />
          )}

          <div className={styles.bottom} ref={bottomRef} />
        </div>

        <div className={styles.input}>
          <input
            type='text'
            placeholder='Write a message...'
            value={inputValue}
            onChange={e => setInputValue(e.currentTarget.value)}
            onKeyDown={inputKeyDownHandler}
          />
        </div>
      </div>
      <button
        className={cx({ open: true, openD: isDarkMode })}
        onClick={toggleOpenStatus}
      >
        {isChatOpen ? (
          <CrossIcon size='20px' />
        ) : (
          <MessageIcon size='20px' fill='#979EA7' />
        )}
      </button>
    </div>
  );
};

export default Chat;
