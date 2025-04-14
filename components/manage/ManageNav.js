import React from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/manage/ManageNav.module.css';

const ManageNav = () => {
  const router = useRouter();

  return (
    <Nav className={styles.manageNav}>
      <Link 
        href="/manage/events" 
        className={`${styles.navLink} ${router.pathname.startsWith('/manage/events') ? styles.active : ''}`}
      >
        Events
      </Link>
      <Link 
        href="/manage/members" 
        className={`${styles.navLink} ${router.pathname.startsWith('/manage/members') ? styles.active : ''}`}
      >
        Members
      </Link>
    </Nav>
  );
};

export default ManageNav;
