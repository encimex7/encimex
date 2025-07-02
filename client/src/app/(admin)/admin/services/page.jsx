"use client";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { deleteService, getServiceDetails, getServices, submitService, updateService } from "../../../actions/actions.js";
import CustomModal from "../blogs/CustomModal.jsx";

const initialValues = {
  title: "",
  subtitle: "",
  description: "",
  main_photo: "",
  photos: [],
  service_detail_count: 0,
  service_detail: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  main_photo: Yup.mixed()
    .required("Main photo is required"),
  photos: Yup.array()
    .min(1, "At least one additional photo is required")
    .required("Additional photos are required"),
  service_detail: Yup.array()
    .of(
      Yup.object().shape({
        heading: Yup.string().required("Heading is required"),
        description: Yup.string().required("Description is required"),
        photo: Yup.array().of(Yup.mixed()),
      })
    )
    .required("At least one service detail is required"),
});

const ServiceEditor = () => {
  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const fileInputRef = useRef(null);

  const fetchServices = () => {
    getServices().then((res) => {
      if (res.success) {
        setServices(JSON.parse(res.services));
      }
    });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form values before submission:", values);
    console.log("Main photo file:", values.main_photo);
    
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("description", values.description);
    formData.append("main_photo", values.main_photo);
    
    values.photos.forEach((photo) => {
      formData.append("photos[]", photo);
    });

     // Handle service detail photos
    const serviceDetailsWithPhotos = values.service_detail.map(detail => {
      const photoFiles = detail.photo || [];
      return {
        ...detail,
        photo: photoFiles.map(file => file.name) // Just send filenames, files will be appended separately
      };
    });
    
    formData.append("service_detail", JSON.stringify(serviceDetailsWithPhotos));

    // Append service detail photos to formData
    values.service_detail.forEach((detail, index) => {
      if (detail.photo && detail.photo.length > 0) {
        detail.photo.forEach((file, fileIndex) => {
          formData.append(`service_detail_${index}_photos[]`, file);
        });
      }
    });
    
    const slug = generateSlug(values.title);
    formData.append("slug", slug);

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const result = await submitService(formData);
      console.log("Submit service result:", result);
      if (result.success) {
        setSuccessMessage("Service added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchServices();
      }
    } catch (error) {
      console.error("Error submitting service:", error);
    }
    setSubmitting(false);
  };

  const handleEdit = async (slug) => {
    const result = await getServiceDetails(slug);
    if (result.success) {
      const service = JSON.parse(result.service);
      setCurrentService(service);
      setIsEditModalOpen(true);
    } else {
      console.error("Failed to fetch service details:", result.error);
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("description", values.description);
    formData.append("main_photo", values.main_photo);
    
    // Append new photos (if any)
    values.photos.forEach((photo) => {
      if (photo instanceof File) {
        formData.append("photos[]", photo);
      }
    });

       // Handle service detail photos
    const serviceDetailsWithPhotos = values.service_detail.map(detail => {
      const photoFiles = detail.photo || [];
      return {
        ...detail,
        photo: photoFiles.map(file => file.name) // Just send filenames, files will be appended separately
      };
    });

     // Append service detail photos to formData
    values.service_detail.forEach((detail, index) => {
      if (detail.photo && detail.photo.length > 0) {
        detail.photo.forEach((file, fileIndex) => {
          if (file instanceof File) {
            formData.append(`service_detail_${index}_photos[]`, file);
          }
        });
      }
    });
    
    // Append service details as JSON
   formData.append("service_detail", JSON.stringify(serviceDetailsWithPhotos));
    
    // Indicate to keep existing photos
    formData.append("keep_existing_photos", "true");

    try {
      const result = await updateService(currentService.slug, formData);
      if (result.success) {
        setSuccessMessage("Service updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        setIsEditModalOpen(false);
        fetchServices();
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
    setSubmitting(false);
  };

const deleteServiceHandler = (serviceId) => {
  if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
    deleteService(serviceId).then((res) => {
      if (res.success) {
        toast.success("Service deleted successfully!");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    }).catch((error) => {
      toast.error(error.message || "Error deleting service");
    });
  }
};

  return (
    <section className="relative flex w-full min-h-screen justify-center items-center bg-gradient-to-r from-orang to-orang p-10">
      <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full top-10 left-10"></div>
      {/* addingservice */}
      <div className="w-[50rem] bg-white p-6 flex flex-col gap-4 rounded-2xl shadow-2xl items-center font-helvetica relative z-10 mx-20">
        <h1 className="text-3xl font-bold text-pink-600">Add a Service</h1>
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
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="w-full flex flex-col gap-3">
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-pink-600 text-xl">Title:</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Service Title"
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="font-bold text-pink-600 text-xl">Subtitle:</label>
                  <Field
                    type="text"
                    name="subtitle"
                    placeholder="Service Subtitle"
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                  />
                  <ErrorMessage name="subtitle" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="font-bold text-pink-600 text-xl">Description:</label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Service Description"
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="font-bold text-pink-600 text-xl">Main Photo:</label>
                  <input
                    type="file"
                    onChange={(event) => {
                      setFieldValue("main_photo", event.currentTarget.files[0]);
                    }}
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                  />
                  <ErrorMessage name="main_photo" component="div" className="text-red-500" />
                  {values.main_photo && (
                    <div className="mt-2">
                      <p className="text-sm">Selected main photo: {values.main_photo.name}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-pink-600 text-xl">Additional Photos:</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    onChange={(event) => {
                      setFieldValue("photos", Array.from(event.currentTarget.files));
                    }}
                    className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                  />
                  <ErrorMessage name="photos" component="div" className="text-red-500" />
                  {values.photos.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm">Selected additional photos: {values.photos.map(f => f.name).join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details Section */}
              <div className="mt-6">
                <label className="font-bold text-pink-600 text-xl">Service Details:</label>
                <Field
                  name="service_detail_count"
                  type="number"
                  min="0"
                  placeholder="Number of Service Details"
                  className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                  value={values.service_detail_count || 0}
                  onChange={(e) => {
                    const count = parseInt(e.target.value, 10) || 0;
                    setFieldValue("service_detail_count", count);

                    const current = values.service_detail || [];

                    if (count > current.length) {
                      const newItems = [...current, ...Array(count - current.length).fill({ heading: "", description: "",photo: []  })];
                      setFieldValue("service_detail", newItems);
                    } else {
                      setFieldValue("service_detail", current.slice(0, count));
                    }
                  }}
                />
                <ErrorMessage name="service_detail_count" component="div" className="text-red-500" />

                <FieldArray name="service_detail">
                  {() => (
                    <div className="space-y-4 mt-4">
                      {values.service_detail?.map((item, index) => (
                        <div key={index} className="mb-6 p-5 rounded-lg border border-orang">
                          <h3 className="text-xl font-semibold text-orang mb-4">Service Detail {index + 1}</h3>

                          <div className="mb-3">
                            <label className="block text-black">Heading</label>
                            <Field
                              type="text"
                              name={`service_detail[${index}].heading`}
                              placeholder="Enter heading"
                              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            />
                            <ErrorMessage name={`service_detail[${index}].heading`} component="div" className="text-red-500" />
                          </div>

                          <div className="mb-3">
                            <label className="block text-black">Description</label>
                            <Field
                              as="textarea"
                              name={`service_detail[${index}].description`}
                              placeholder="Enter description"
                              rows={3}
                              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            />
                            <ErrorMessage name={`service_detail[${index}].description`} component="div" className="text-red-500" />
                          </div>

                          <div className="mb-3">
                            <label className="block text-black">Photos ional)</label>
                            <input
                              type="file"
                              multiple
                              onChange={(event) => {
                                setFieldValue(
                                  `service_detail[${index}].photo`,
                                  Array.from(event.currentTarget.files)
                                );
                              }}
                              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            />
                            {values.service_detail[index]?.photo?.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm">Selected photos: {values.service_detail[index].photo.map(f => f.name).join(", ")}</p>
                              </div>
                            )}
                          </div>


                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition mt-6"
              >
                {isSubmitting ? "Submitting..." : "Submit Service"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Services List */}
      <div className="w-full max-w-2xl px-6 mt-10">
        <h1 className="text-white text-xl font-helvetica font-bold">Service List</h1>
        {services?.map((service, index) => (
          <div className="bg-white flex justify-between items-center p-5 rounded-xl shadow-lg mt-4" key={index}>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{service?.title}</h1>
              <p className="text-sm text-gray-600">{service?.subtitle}</p>
            </div>
            <div className="flex gap-4">
              <button 
                className="text-2xl text-blue-500" 
                onClick={() => handleEdit(service?.slug)}
              >
                <MdEdit />
              </button>
              <button 
                className="text-2xl text-red-500" 
                onClick={() => deleteServiceHandler(service?._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>



      {/* Edit Modal */}
      <div className="h-[80vh]">
        <CustomModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Edit Service</h2>
          {currentService && (
            <Formik
              initialValues={{
                title: currentService.title,
                subtitle: currentService.subtitle,
                description: currentService.description,
                main_photo: currentService.main_photo,
                photos: [],
                service_detail: currentService.service_detail || [],
                service_detail_count: currentService.service_detail?.length || 0,
              }}
              onSubmit={handleUpdate}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="w-full flex flex-col gap-3">
                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-pink-600 text-xl">Title:</label>
                      <Field
                        type="text"
                        name="title"
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="font-bold text-pink-600 text-xl">Subtitle:</label>
                      <Field
                        type="text"
                        name="subtitle"
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                      />
                      <ErrorMessage name="subtitle" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="font-bold text-pink-600 text-xl">Description:</label>
                      <Field
                        as="textarea"
                        name="description"
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="font-bold text-pink-600 text-xl">Main Photo:</label>
                      <input
                        type="file"
                        onChange={(event) => {
                          setFieldValue("main_photo", event.currentTarget.files[0]);
                        }}
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                      />
                      <div className="mt-2 text-black">
                        <p className="text-sm text-black">Current main photo: {currentService.main_photo}</p>
                        {values.main_photo && (
                          <p className="text-sm text-black">New main photo: {values.main_photo.name}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-pink-600 text-xl">Additional Photos:</label>
                      <input
                        type="file"
                        multiple
                        onChange={(event) => {
                          setFieldValue("photos", Array.from(event.currentTarget.files));
                        }}
                        className="w-full p-3 rounded-lg text-black border-2 border-pink-400"
                      />
                      <div className="mt-2">
                        <p className="text-sm text-black">Current photos: {currentService.photos.length}</p>
                        {values.photos.length > 0 && (
                          <p className="text-sm text-black">New photos: {values.photos.map(f => f.name).join(", ")}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Details Editing Section */}
                  <div className="mt-6">
                    <label className="font-bold text-pink-600 text-xl">Service Details:</label>
                    <Field
                      name="service_detail_count"
                      type="number"
                      min="0"
                      placeholder="Number of Service Details"
                      className="w-full p-3 rounded-lg text-black border-2 border-pink-400 focus:ring-2 focus:ring-pink-500"
                      value={values.service_detail_count || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value, 10) || 0;
                        setFieldValue("service_detail_count", count);

                        const current = values.service_detail || [];

                        if (count > current.length) {
                          const newItems = [...current, ...Array(count - current.length).fill({ heading: "", description: "" })];
                          setFieldValue("service_detail", newItems);
                        } else {
                          setFieldValue("service_detail", current.slice(0, count));
                        }
                      }}
                    />

                    <FieldArray name="service_detail">
                      {() => (
                        <div className="space-y-4 mt-4">
                          {values.service_detail?.map((item, index) => (
                            <div key={index} className="mb-6 p-5 rounded-lg border border-orang">
                              <h3 className="text-xl font-semibold text-orang mb-4">Service Detail {index + 1}</h3>

                              <div className="mb-3">
                                <label className="block text-black">Heading</label>
                                <Field
                                  type="text"
                                  name={`service_detail[${index}].heading`}
                                  placeholder="Enter heading"
                                  className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                                />
                                <ErrorMessage name={`service_detail[${index}].heading`} component="div" className="text-red-500" />
                              </div>

                              <div className="mb-3">
                                <label className="block text-black">Description</label>
                                <Field
                                  as="textarea"
                                  name={`service_detail[${index}].description`}
                                  placeholder="Enter description"
                                  rows={3}
                                  className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                                />
                                <ErrorMessage name={`service_detail[${index}].description`} component="div" className="text-red-500" />
                              </div>

                              <div className="mb-3">
                                <label className="block text-black">Photos (Optional)</label>
                                <input
                                  type="file"
                                  multiple
                                  onChange={(event) => {
                                    setFieldValue(
                                      `service_detail[${index}].photo`,
                                      Array.from(event.currentTarget.files)
                                    );
                                  }}
                                  className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                                />
                                <div className="mt-2 text-black">
                                  {currentService.service_detail[index]?.photo?.length > 0 && (
                                    <p className="text-sm">Current photos: {currentService.service_detail[index].photo.length}</p>
                                  )}
                                  {values.service_detail[index]?.photo?.length > 0 && (
                                    <p className="text-sm">New photos: {values.service_detail[index].photo.map(f => f.name).join(", ")}</p>
                                  )}
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition mt-6"
                  >
                    {isSubmitting ? "Updating..." : "Update Service"}
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
export default ServiceEditor;