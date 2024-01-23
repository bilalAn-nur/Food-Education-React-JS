import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Auth/appwrite/ApiAppwrite";
import { format, parseISO } from "date-fns";
import RichTextEditor from "../../widgets/layout/RichTextEditor";

export function PostArticle() {
  const {
    user,
    allPostCollection,
    addPostCollection,
    deletePostCollection,
    editPostCollection,
  } = useAuth();
  const [post, setPosts] = useState([]);
  const [contentAdd, setContentAdd] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [openAddPost, setOpenAddPost] = React.useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [openEditPost, setOpenEditPost] = React.useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOpenAddPost = () => setOpenAddPost(!openAddPost);

  const handleOpenEditPost = (postId, imageUrl) => {
    setEditingPost(postId);
    setOpenEditPost(true);
    setEditingImage(imageUrl);
  };

  const [image, setImage] = useState(null);
  const [imageEdit, setImageEdit] = useState(null);

  const addPostForm = useRef(null);
  const EditPostForm = useRef(null);
  const currentTime = new Date();
  const uploadnow = currentTime.toISOString();

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const handleAddPost = async (e) => {
    e.preventDefault();

    const formAddData = {
      creator: user.$id,
      title: addPostForm.current.title.value,
      category: addPostForm.current.category.value,
      file: image,
      content: contentAdd,
      uploadTime: uploadnow,
    };
    setErrors({
      title: "",
      category: "",
      file: "",
      content: "",
    });

    const postInfo = { ...formAddData };
    try {
      await addPostCollection(postInfo);
      alert("Article posted successfully.");
      window.location.reload();
      setOpenAddPost(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId, imageId) => {
    try {
      const deleteResult = await deletePostCollection(postId, imageId);

      if (deleteResult && deleteResult.status === "Ok") {
        alert("Post berhasil dihapus!");
        window.location.reload();
      } else {
        console.log("Failed to delete post.");
      }
      console.log(deleteResult);
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleEditPost = async (e, postId) => {
    e.preventDefault();
    try {
      let title = EditPostForm.current.title.value;
      let content = contentEdit;
      let imageUrl = EditPostForm.current.file.value;
      let imageId = EditPostForm.current.imageId.value;
      if (!title) {
        title = EditPostForm.current.title2.value;
      }

      if (!content) {
        content = EditPostForm.current.content2.value;
      }

      if (!imageUrl) {
        imageUrl = EditPostForm.current.file2.value;
      }

      const formEditData = {
        title: title,
        category: EditPostForm.current.category.value,
        file: imageEdit,
        imageUrl: imageUrl,
        content: content,
        imageId: imageId,
      };
      console.log(formEditData);
      await editPostCollection(postId, formEditData);
      if (!editPostCollection) throw Error;
      alert("Article edited successfully.");
      window.location.reload();
      setOpenEditPost(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (value) => {
    setContentAdd(value);
  };

  const handleContentChangeEdit = (value) => {
    setContentEdit(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleImageChangeEdit = (event) => {
    const file = event.target.files[0];
    setImageEdit(file);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredPosts = post.filter((p) => {
      return (
        p.title.toLowerCase().includes(term.toLowerCase()) ||
        p.category.toLowerCase().includes(term.toLowerCase())
      );
    });
    setSearchResults(filteredPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allPostCollection();
        setPosts(response);
        setSearchResults(response);
      } catch (error) {
        console.error("Error fetching user collection:", error);
      }
    };

    fetchData();
  }, [allPostCollection]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            <Input
              label="Search..."
              color="white"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <Button onClick={handleOpenAddPost} className="ml-5">
            Tambah
          </Button>
          <Dialog open={openAddPost} handler={handleOpenAddPost}>
            <DialogHeader>Tambah Artikel</DialogHeader>
            <form ref={addPostForm} onSubmit={handleAddPost}>
              <DialogBody className="h-[24rem] overflow-scroll">
                <Typography className="font-normal">
                  <div className="mb-4">
                    <Input
                      size="lg"
                      label="Judul"
                      placeholder="Tuliskan judul artikel"
                      name="title"
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      className="appearance-none w-full py-1 px-2 border-2 rounded-sm"
                      name="category">
                      <option value="" selected disabled>
                        Kategori&hellip;
                      </option>
                      <option value="Diet">Diet</option>
                      <option value="Kehidupan Sehat">Kehidupan Sehat</option>
                      <option value="Makanan Orang Sakit">
                        Makanan Orang Sakit
                      </option>
                    </select>
                    {/* <select name="category" id="">
                      <option value="Diet"></option>
                    </select> */}
                  </div>
                  <div className="mb-4">
                    <input
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      name="file"
                    />
                    {image && (
                      <div className="mt-4">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Uploaded"
                          className="max-w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <RichTextEditor
                      value={contentAdd}
                      onChange={handleContentChange}
                    />
                  </div>
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  variant="text"
                  color="blue-gray"
                  onClick={handleOpenAddPost}>
                  cancel
                </Button>
                <Button variant="gradient" color="green" type="submit">
                  confirm
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Gambar",
                  "Judul",
                  "penulis",
                  "kategodi",
                  "tanggal upload",
                  "Action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchResults.map(
                (
                  {
                    imageUrl,
                    title,
                    uploadTime,
                    creator,
                    category,
                    $id,
                    imageId,
                    content,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === post.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  const formattedJoinedDate = format(
                    parseISO(uploadTime),
                    "MMM dd, yyyy, HH:mm"
                  );

                  const handleDeleteClick = () => {
                    handleDeletePost($id, imageId);
                  };

                  const shouldDisplayPost =
                    user.roleId === 0 ||
                    (user.roleId === 1 && creator.$id === user.$id);
                  return shouldDisplayPost ? (
                    <tr key={title}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <img src={imageUrl} alt={title} className="w-32" />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {title}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {creator.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {category}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formattedJoinedDate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          as="a"
                          href="#"
                          onClick={() => handleOpenEditPost($id, imageUrl)}
                          className="text-xs font-semibold mr-2">
                          Edit
                        </Button>
                        <Dialog
                          open={openEditPost && editingPost === $id}
                          handler={handleOpenEditPost}>
                          <DialogHeader>Edit Artikel {title}</DialogHeader>
                          <form
                            ref={EditPostForm}
                            onSubmit={(e) => handleEditPost(e, $id)}>
                            <DialogBody className="h-[24rem] overflow-scroll">
                              <Typography className="font-normal">
                                <div className="mb-4">
                                  <Input
                                    size="lg"
                                    label="Judul"
                                    placeholder="Tuliskan judul artikel"
                                    name="title"
                                  />
                                  <input
                                    type="text"
                                    name="title2"
                                    value={title}
                                    hidden
                                  />
                                </div>
                                <div className="mb-4">
                                  <select
                                    className="appearance-none w-full py-1 px-2 border-2 rounded-sm"
                                    name="category">
                                    <option value="" disabled>
                                      Kategori&hellip;
                                    </option>
                                    <option
                                      value="Diet"
                                      selected={category === "Diet"}>
                                      Diet
                                    </option>
                                    <option
                                      value="Kehidupan Sehat"
                                      selected={category === "Kehidupan Sehat"}>
                                      Kehidupan Sehat
                                    </option>
                                    <option
                                      value="Makanan Orang Sakit"
                                      selected={
                                        category === "Makanan Orang Sakit"
                                      }>
                                      Makanan Orang Sakit
                                    </option>
                                  </select>
                                </div>
                                <div className="mb-4">
                                  <input
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="formFile"
                                    accept="image/*"
                                    onChange={handleImageChangeEdit}
                                    name="file"
                                  />
                                  <input
                                    type="text"
                                    name="file2"
                                    value={imageUrl}
                                    hidden
                                  />
                                  <input
                                    type="text"
                                    name="imageId"
                                    value={imageId}
                                    hidden
                                  />
                                  {imageEdit && (
                                    <div className="mt-4">
                                      <img
                                        src={URL.createObjectURL(imageEdit)}
                                        alt="Uploaded"
                                        className="max-w-full h-auto"
                                      />
                                    </div>
                                  )}
                                  {!imageEdit && imageUrl && (
                                    <div className="mt-4">
                                      <img
                                        src={imageUrl}
                                        alt="Existing"
                                        className="max-w-full h-auto"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="mb-4">
                                  <RichTextEditor
                                    value={contentEdit}
                                    onChange={handleContentChangeEdit}
                                  />
                                  <input
                                    type="text"
                                    value={content}
                                    name="content2"
                                    hidden
                                  />
                                </div>
                              </Typography>
                            </DialogBody>
                            <DialogFooter className="space-x-2">
                              <Button
                                variant="text"
                                color="blue-gray"
                                onClick={handleOpenEditPost}>
                                cancel
                              </Button>
                              <Button
                                variant="gradient"
                                color="green"
                                type="submit">
                                confirm
                              </Button>
                            </DialogFooter>
                          </form>
                        </Dialog>
                        <Button
                          onClick={handleDeleteClick}
                          className="text-xs font-semibold">
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ) : null;
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PostArticle;
