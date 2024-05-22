import React from 'react'

const Chatroom = ({active}) => {
  return (
    <svg width="18" height="18" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.5C8.8174 0.5 5.76516 1.76428 3.51472 4.01472C1.26428 6.26515 0 9.3174 0 12.5C0 15.6826 1.26428 18.7348 3.51472 20.9853C5.76516 23.2357 8.8174 24.5 12 24.5H18C19.864 24.5 20.796 24.5 21.5307 24.196C22.0161 23.995 22.4572 23.7003 22.8287 23.3287C23.2003 22.9572 23.495 22.5161 23.696 22.0307C24 21.296 24 20.364 24 18.5V12.5C24 9.3174 22.7357 6.26515 20.4853 4.01472C18.2348 1.76428 15.1826 0.5 12 0.5ZM6.66667 11.1667C6.66667 10.813 6.80714 10.4739 7.05719 10.2239C7.30724 9.97381 7.64638 9.83333 8 9.83333H16C16.3536 9.83333 16.6928 9.97381 16.9428 10.2239C17.1929 10.4739 17.3333 10.813 17.3333 11.1667C17.3333 11.5203 17.1929 11.8594 16.9428 12.1095C16.6928 12.3595 16.3536 12.5 16 12.5H8C7.64638 12.5 7.30724 12.3595 7.05719 12.1095C6.80714 11.8594 6.66667 11.5203 6.66667 11.1667ZM10.6667 16.5C10.6667 16.1464 10.8071 15.8072 11.0572 15.5572C11.3072 15.3071 11.6464 15.1667 12 15.1667H16C16.3536 15.1667 16.6928 15.3071 16.9428 15.5572C17.1929 15.8072 17.3333 16.1464 17.3333 16.5C17.3333 16.8536 17.1929 17.1928 16.9428 17.4428C16.6928 17.6929 16.3536 17.8333 16 17.8333H12C11.6464 17.8333 11.3072 17.6929 11.0572 17.4428C10.8071 17.1928 10.6667 16.8536 10.6667 16.5Z" fill={active ? '#16192A' : '#F3F3F3'}/>
</svg>

  )
}

export default Chatroom
