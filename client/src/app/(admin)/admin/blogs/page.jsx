"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { deleteblog, getblogDetails, getblogs, submitblog, updateblog } from "../../../actions/actions.js";
import CustomModal from "./CustomModal.jsx";

const initialValues = {
  title: "",
  description: "",
  author_name: "",
  photo: null,
  date: new Date().toISOString().split('T')[0], // Default to today's date
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  author_name: Yup.string().required("Author name is required"),
  photo: Yup.mixed().required("Photo is required"),
  date: Yup.date().required("Date is required"),
});

const Editor = () => {
  const [blogs, setblogs] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentblog, setCurrentblog] = useState(null);
  const fileInputRef = useRef(null);

  const fetchblogs = () => {
    getblogs().then((res) => {
      if (res.success) {
        setblogs(JSON.parse(res.blogs));
      }
    });
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author_name", values.author_name);
    formData.append("photo", values.photo);
    formData.append("date", values.date);
    
    const slug = generateSlug(values.title);
    formData.append("slug", slug);

    try {
      const result = await submitblog(formData);
      if (result.success) {
        setSuccessMessage("Blog added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchblogs();
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
    setSubmitting(false);
  };

  const handleEdit = async (slug) => {
    const result = await getblogDetails(slug);
    if (result.success) {
      const blog = JSON.parse(result.blog);
      setCurrentblog(blog);
      setIsEditModalOpen(true);
    } else {
      console.error("Failed to fetch blog details:", result.error);
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("author_name", values.author_name);
    formData.append("photo", values.photo);
    formData.append("date", values.date);

    try {
      const result = await updateblog(currentblog.slug, formData);
      if (result.success) {
        // Show success toast
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        
        // Close modal and reset state
        setIsEditModalOpen(false);
        setCurrentblog(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchblogs();
      } else {
        // Show error toast
        Swal.fire({
          title: "Error!",
          text: result.error || "Failed to update blog",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      // Show error toast
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update blog",
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
    }
    setSubmitting(false);
  };

  const deleteblogHandler = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteblog(blogId).then((res) => {
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your blog has been deleted.",
              icon: "success",
            });
            fetchblogs();
          }
        });
      }
    });
  };

  return (
    <section className="relative flex w-full min-h-screen justify-center items-center bg-gradient-to-r from-orang to-orang   p-10">
      <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full top-10 left-10"></div>
      <div className="absolute w-24 h-24 bg-white opacity-20 rounded-full bottom-20 right-20"></div>

      <div className="w-[50rem] bg-white p-6 flex flex-col gap-4 rounded-2xl shadow-2xl items-center font-helvetica relative z-10 mx-20">
        <h1 className="text-3xl font-bold text-pink-600">Add a blog</h1>
        {successMessage && (
          <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="w-full flex flex-col gap-3">
              <div>
                <h2 className="font-bold text-pink-600 text-xl">Title : </h2>
                <Field
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                />
                <ErrorMessage name="title" component="div" className="text-red-500" />
              </div>

              <div>
                <h2 className="font-bold text-pink-600 text-xl">Description : </h2>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Blog Description"
                  className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>

              <div>
                <h2 className="font-bold text-pink-600 text-xl">Author Name : </h2>
                <Field
                  type="text"
                  name="author_name"
                  placeholder="Author Name"
                  className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                />
                <ErrorMessage name="author_name" component="div" className="text-red-500" />
              </div>

              <div>
                <h2 className="font-bold text-pink-600 text-xl">Date : </h2>
                <Field
                  type="date"
                  name="date"
                  className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                />
                <ErrorMessage name="date" component="div" className="text-red-500" />
              </div>

              <div>
                <h2 className="font-bold text-pink-600 text-xl">Image : </h2>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                  className="w-full p-3 rounded-lg text-black  border-2 border-pink-400"
                />
                <ErrorMessage name="photo" component="div" className="text-red-500" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Blog"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full max-w-2xl px-6 mt-10">
        <h1 className="text-white text-xl font-helvetica font-bold">Blog List</h1>
        {blogs?.map((elem, index) => (
          <div className="bg-white flex justify-between items-center p-5 rounded-xl shadow-lg mt-4" key={index}>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{elem?.title}</h1>
              <p className="text-sm text-gray-600">by {elem?.author_name}</p>
            </div>
            <div className="flex gap-4">
              <button className="text-2xl text-blue-500" onClick={() => handleEdit(elem?.slug)}>
                <MdEdit />
              </button>
              <button className="text-2xl text-red-500" onClick={() => deleteblogHandler(elem?._id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal for Editing */}
      <div className="h-[80vh]">
        <CustomModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Edit Blog</h2>
          {currentblog && (
            <Formik
              initialValues={{
                title: currentblog.title,
                description: currentblog.description,
                author_name: currentblog.author_name,
                photo: currentblog.photo,
                date: new Date(currentblog.date).toISOString().split('T')[0],
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="w-full flex flex-col gap-3">
                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Title : </h2>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Blog Title"
                      className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Description : </h2>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Blog Description"
                      className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Author Name : </h2>
                    <Field
                      type="text"
                      name="author_name"
                      placeholder="Author Name"
                      className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    />
                    <ErrorMessage name="author_name" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Date : </h2>
                    <Field
                      type="date"
                      name="date"
                      className="w-full p-3 rounded-lg text-black  border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    />
                    <ErrorMessage name="date" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Image : </h2>
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                      }}
                      className="w-full p-3 rounded-lg text-black  border-2 border-pink-400"
                    />
                    <ErrorMessage name="photo" component="div" className="text-red-500" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition"
                  >
                    {isSubmitting ? "Updating..." : "Update Blog"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </CustomModal>
      </div>
    </section>
  );
};

export default Editor;