"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { deleteGallery, getGalleries, getGalleryDetails, submitGallery, updateGallery } from "../../../actions/actions.js";
import CustomModal from "../blogs/CustomModal.jsx";

const initialValues = {
  galleryType: "project",
  title: "steel-detailing",
  image: null,
  officeTitle: "",
  subTitle: "",
};

const validationSchema = Yup.object({
  galleryType: Yup.string().required("Gallery type is required"),
  image: Yup.mixed().required("Image is required"),
  // subTitle: Yup.string().when("galleryType", {
  //   is: "project",
  //   then: Yup.string().required("Subtitle is required for Project Gallery"),
  //   otherwise: Yup.string().notRequired()
  // })
});

const Editor = () => {
  const [galleries, setGalleries] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchGalleries = () => {
    getGalleries().then((res) => {
      if (res.success) {
        setGalleries(JSON.parse(res.galleries));
      }
    });
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("galleryType", values.galleryType);
    formData.append("image", values.image);
    if (values.galleryType === "project") {
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
    } else if (values.galleryType === "office") {
      formData.append("title", values.officeTitle);
    }

    try {
      const result = await submitGallery(formData);
      if (result.success) {
        setSuccessMessage("Gallery added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        resetForm({
          values: {
            galleryType: "project",
            title: "steel-detailing",
            image: null,
            officeTitle: "",
            subTitle: ""
          }
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchGalleries();
      }
    } catch (error) {
      console.error("Error submitting gallery:", error);
    }
    setSubmitting(false);
  };

  const handleEdit = async (id) => {
    const result = await getGalleryDetails(id);
    if (result.success) {
      const gallery = JSON.parse(result.gallery);
      setCurrentGallery(gallery);
      setPreviewImage(gallery.image);
      setIsEditModalOpen(true);
    } else {
      console.error("Failed to fetch gallery details:", result.error);
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("galleryType", values.galleryType);
    formData.append("image", values.image);
    if (values.galleryType === "project") {
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
    } else if (values.galleryType === "office") {
      formData.append("title", values.officeTitle);
    }

    try {
  const result = await updateGallery(currentGallery._id, formData);
  if (result.success) {
    toast.success("Gallery updated successfully!", { autoClose: 2000 });
    
    setIsEditModalOpen(false);
    setCurrentGallery(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fetchGalleries();
  }
} catch (error) {
  toast.error(error.message || "Failed to update gallery", { autoClose: 2000 });
}
setSubmitting(false);
  };

const deleteGalleryHandler = (id) => {
  if (window.confirm("Are you sure you want to delete this gallery? This action cannot be undone.")) {
    deleteGallery(id).then((res) => {
      if (res.success) {
        toast.success("Gallery deleted successfully!");
        fetchGalleries();
      } else {
        toast.error("Failed to delete gallery");
      }
    });
  }
};

  return (
    <section className="relative flex w-full min-h-screen justify-start items-start bg-gradient-to-r from-orang to-orang p-10">
      <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full top-10 left-10"></div>
      <div className="absolute w-24 h-24 bg-white opacity-20 rounded-full bottom-20 right-20"></div>

      <div className="w-[45rem] bg-white p-6 flex flex-col gap-4 rounded-2xl shadow-2xl items-center font-helvetica relative z-10 mx-12">
        <h1 className="text-3xl font-bold text-pink-600">Add a Gallery</h1>
        {successMessage && (
          <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-3">
              <div>
                <h2 className="font-bold text-pink-600 text-xl">Gallery Type : </h2>
                <Field
                  as="select"
                  name="galleryType"
                  className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                >
                  <option value="project">Project Gallery</option>
                  <option value="office">Office Gallery</option>
                </Field>
                <ErrorMessage name="galleryType" component="div" className="text-red-500" />
              </div>

              {values.galleryType === "project" && (
                <>
                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Title : </h2>
                    <Field
                      as="select"
                      name="title"
                      className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="steel-detailing">Steel Detailing</option>
                      <option value="rebar-detailing">Rebar Detailing</option>
                      <option value="connection-design-pe-stamping">Connection Design</option>
                      <option value="mep-bim-services">MEP BIM services</option>
                      <option value="architectural-bimservices">Architectural bimservices</option>
                      <option value="facade-detailing">facade-detailing</option>
                    </Field>
                    <ErrorMessage name="title" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Subtitle : </h2>
                    <Field
                      name="subTitle"
                      type="text"
                      placeholder="Enter project subtitle"
                      className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    />
                    <ErrorMessage name="subTitle" component="div" className="text-red-500" />
                  </div>
                </>
              )}

              {values.galleryType === "office" && (
                <div>
                  <h2 className="font-bold text-pink-600 text-xl">Office Title : </h2>
                  <Field
                    name="officeTitle"
                    type="text"
                    placeholder="Enter office title"
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                  />
                  <ErrorMessage name="officeTitle" component="div" className="text-red-500" />
                </div>
              )}

              <div>
                <h2 className="font-bold text-pink-600 text-xl">Image : </h2>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                />
                <ErrorMessage name="image" component="div" className="text-red-500" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Gallery"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-full max-w-5xl px-4 mt-10 mx-auto">
        <h1 className="text-white text-xl font-helvetica font-bold mb-4">Gallery List</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleries?.map((elem, index) => (
            <div
              key={index}
              className="bg-white flex justify-between items-center p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <Image
                    src={elem?.image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  {elem?.title && <p className="text-sm font-semibold text-gray-600">{elem.title}</p>}
                  <p className="text-sm text-gray-600">Type: {elem?.galleryType}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="text-xl text-blue-500" onClick={() => handleEdit(elem?._id)}>
                  <MdEdit />
                </button>
                <button className="text-xl text-red-500" onClick={() => deleteGalleryHandler(elem?._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <CustomModal isOpen={isEditModalOpen} onClose={() => {
        setIsEditModalOpen(false);
        setPreviewImage(null);
      }}>
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Edit Gallery</h2>
        {currentGallery && (
          <Formik
            initialValues={{
              galleryType: currentGallery.galleryType,
              title: currentGallery.title || "steel-detailing",
              image: currentGallery.image,
              officeTitle: currentGallery.title || "",
              subTitle: currentGallery.subTitle || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="w-full flex flex-col gap-3">
                <div>
                  <h2 className="font-bold text-pink-600 text-xl">Gallery Type : </h2>
                  <Field
                    as="select"
                    name="galleryType"
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="project">Project Gallery</option>
                    <option value="office">Office Gallery</option>
                  </Field>
                  <ErrorMessage name="galleryType" component="div" className="text-red-500" />
                </div>

                {values.galleryType === "project" && (
                  <>
                    <div>
                      <h2 className="font-bold text-pink-600 text-xl">Title : </h2>
                      <Field
                        as="select"
                        name="title"
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="steel-detailing">Steel Detailing</option>
                        <option value="rebar-detailing">Rebar Detailing</option>
                        <option value="connection-design-pe-stamping">Connection Design</option>
                        <option value="mep-bim-services">MEP BIM services</option>
                        <option value="architectural-bimservices">Architectural bimservices</option>
                        <option value="facade-detailing">facade-detailing</option>
                      </Field>
                      <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <h2 className="font-bold text-pink-600 text-xl">Subtitle : </h2>
                      <Field
                        name="subTitle"
                        type="text"
                        placeholder="Enter project subtitle"
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                      />
                      <ErrorMessage name="subTitle" component="div" className="text-red-500" />
                    </div>
                  </>
                )}

                {values.galleryType === "office" && (
                  <div>
                    <h2 className="font-bold text-pink-600 text-xl">Office Title : </h2>
                    <Field
                      name="officeTitle"
                      type="text"
                      placeholder="Enter office title"
                      className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                    />
                    <ErrorMessage name="officeTitle" component="div" className="text-red-500" />
                  </div>
                )}

                <div>
                  <h2 className="font-bold text-pink-600 text-xl">Image : </h2>
                  <input
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue("image", file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500" />
                  
                  {previewImage && (
                    <div className="mt-4 relative w-40 h-40">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition"
                >
                  {isSubmitting ? "Updating..." : "Update Gallery"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </CustomModal>
    </section>
  );
};

export default Editor;