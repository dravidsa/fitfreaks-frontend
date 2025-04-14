import React from 'react';
import Link from 'next/link';
import { Container, Table, Image, Button } from 'react-bootstrap';
import Layout from '@/components/global/layout';
import { membersData } from '@/data/members';
import styles from '@/styles/manage/Members.module.css';
import ManageNav from '@/components/manage/ManageNav';

export default function MembersPage() {
  return (
    <Layout title="Manage Members">
      <Container className="py-5">
        <ManageNav />
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Members</h1>
          <Link href="/manage/members/invite" className={styles.inviteButton}>
            <Button variant="primary">
              Invite Member
            </Button>
          </Link>
        </div>
        <div className={styles.tableWrapper}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Member Since</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {membersData.map((member) => (
                <tr key={member.id}>
                  <td>
                    <Image
                      src={member.profilePhoto}
                      alt={member.name}
                      className={styles.profilePhoto}
                      roundedCircle
                    />
                  </td>
                  <td>{member.name}</td>
                  <td>{new Date(member.memberSince).toLocaleDateString()}</td>
                  <td>
                    <div>{member.email}</div>
                    <div>{member.phone}</div>
                  </td>
                  <td className={styles.actionButtons}>
                    <Link
                      href={`/manage/members/${member.id}`}
                      className={styles.actionButton}
                    >
                      View Activities
                    </Link>
                    <Link
                      href={`/manage/members/${member.id}/insights`}
                      className={`${styles.actionButton} ${styles.insightButton}`}
                    >
                      Insights
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </Layout>
  );
}
