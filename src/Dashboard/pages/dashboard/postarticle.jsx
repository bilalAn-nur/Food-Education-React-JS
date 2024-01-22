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
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Auth/appwrite/ApiAppwrite";
import { format, parseISO } from "date-fns";
import RichTextEditor from "../../widgets/layout/RichTextEditor";

export function PostArticle() {
  const { user, allPostCollection, addPostCollection, deletePostCollection } =
    useAuth();
  const [post, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [image, setImage] = useState(null);
  const addPostForm = useRef(null);
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
      content: content,
      uploadTime: uploadnow,
    };
    setErrors({
      title: "",
      category: "",
      file: "",
      content: "",
    });

    const postInfo = { ...formAddData };
    console.log(formAddData);

    console.log(postInfo);
    try {
      await addPostCollection(postInfo);
      alert("Article posted successfully.");
      window.location.reload();
      setOpen(false);
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

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allPostCollection();
        setPosts(response);
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
            Post Article
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <Button onClick={handleOpen} className="ml-5">
            Tambah
          </Button>
          <Dialog open={open} handler={handleOpen}>
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
                      value={content}
                      onChange={handleContentChange}
                    />
                  </div>
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="blue-gray" onClick={handleOpen}>
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
              {post.map(
                (
                  {
                    imageUrl,
                    title,
                    uploadTime,
                    creator,
                    category,
                    $id,
                    imageId,
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
                  return (
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
                          {uploadTime}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600 mr-2">
                          Edit
                        </Button>
                        <Button
                          onClick={handleDeleteClick}
                          className="text-xs font-semibold text-blue-gray-600">
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  );
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
