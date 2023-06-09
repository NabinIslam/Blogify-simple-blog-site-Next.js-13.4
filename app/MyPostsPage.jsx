'use client';

import Loading from '@/app/loading';
import ConfirmDelete from '@/components/ConfirmDelete';
import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'flowbite-react';
import Link from 'next/link';
import { useContext, useState } from 'react';

const MyPostsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const { user } = useContext(AuthContext);

  const {
    data: myPosts = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: () =>
      fetch(`/api/v1/blogs/email/${user?.email}`).then(res => res.json()),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <main className="py-20">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-4xl mb-20">Your Posts</h1>
        {myPosts.length === 0 ? (
          <h1 className="text-center">
            You have no post.{' '}
            <Link className="underline" href="/post-blog">
              Click here
            </Link>{' '}
            to post a blog.
          </h1>
        ) : (
          <Table>
            <Table.Head>
              <Table.HeadCell>Blog title</Table.HeadCell>
              <Table.HeadCell>action</Table.HeadCell>
              <Table.HeadCell>action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {myPosts.map(({ title, _id }) => (
                <Table.Row
                  key={_id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link className="hover:underline" href={`/blog/${_id}`}>
                      {title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      href={`/edit-post/${_id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    >
                      <p>Edit</p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        setDeletingPostId(_id);
                        setShowModal(true);
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    >
                      <p>Delete</p>
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <ConfirmDelete
        showModal={showModal}
        setShowModal={setShowModal}
        deletingPostId={deletingPostId}
        refetch={refetch}
      />
    </main>
  );
};

export default MyPostsPage;
