"use server";

import { connect } from "@/lib/dbConnect";
import generateSlug from "@/lib/generateSlug";
import Blog from "@/models/Blog";
import Gallery from "@/models/Gallery";
import Service from "@/models/Service";
import { cookies } from "next/headers";
import cloudinary from '../../lib/cloudinaryConfig';
connect();

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Login attempt:", { email, password });

  if (email === "admin@gmail.com" && password === "admin@123") {
    // Set a cookie to indicate the user is logged in
    // cookies().set("encimex", "true", { httpOnly: true });

    const cookieStore = await cookies();
    cookieStore.set("encimex", "true", { httpOnly: true });
    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
}

export async function logoutAction() {
  // cookies().delete("encimex");  
  const cookieStore = await cookies();
  cookieStore.delete("encimex");
  return { success: true, message: "Logout successful" };
}

export async function getblogs() {
  try {
    const blogs = await Blog.find().lean();
    return { blogs: JSON.stringify(blogs), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getblogDetails(slug) {
  try {
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) {
      return { error: "blog not found", success: false };
    }
    return { blog: JSON.stringify(blog), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function submitblog(formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const author_name = formData.get("author_name");
    const date = formData.get("date");
    const slug = formData.get("slug") || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const photo = formData.get("photo");

    console.log("Submitting blog:", { title, description, author_name, date });

    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file) {
        throw new Error("Photo is required");
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "blogs",
        resource_type: "auto",
      });

      return uploadResponse.secure_url;
    };

    // Upload photo
    const photoUrl = await uploadToCloudinary(photo);

    // Create blog object matching the model
    const blogData = {
      title,
      description,
      author_name,
      date,
      photo: photoUrl,
      slug,
    };

    const blog = new Blog(blogData);
    await blog.save();

    return {
      success: true,
      message: "Blog added successfully!",
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to add blog"
    };
  }
}

export async function updateblog(slug, formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const author_name = formData.get("author_name");
    const date = formData.get("date");
    const photo = formData.get("photo");

    // Find existing blog to preserve existing photo if new one isn't provided
    const existingBlog = await Blog.findOne({ slug }).lean();
    if (!existingBlog) {
      return { success: false, error: "Blog not found" };
    }

    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file || file.size === 0) return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;
      
      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "blogs",
        resource_type: "auto",
      });
      
      return uploadResponse.secure_url;
    };

    // Upload new photo if provided, otherwise keep existing one
    let photoUrl = existingBlog.photo;
    if (photo && photo.size > 0) {
      photoUrl = await uploadToCloudinary(photo);
    }

    // Generate new slug if title changed
    const newSlug = title !== existingBlog.title ? generateSlug(title) : existingBlog.slug;

    const updateData = {
      title,
      description,
      author_name,
      date: date ,
      photo: photoUrl,
      slug: newSlug,
    };

    // Update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return { success: false, error: "Failed to update blog" };
    }

    // Convert to plain object and clean up
    const serializedBlog = updatedBlog.toObject();
    serializedBlog._id = serializedBlog._id.toString();
    delete serializedBlog.__v;

    return {
      success: true,
      message: "Blog updated successfully!",
      blog: serializedBlog,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to update blog"
    };
  }
}

export async function deleteblog(id) {
  try {
    await Blog.findByIdAndDelete(id);
    return { message: "Blog deleted successfully", success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function submitService(formData) {
  try {
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const description = formData.get("description");
    const serviceDetails = JSON.parse(formData.get("service_detail"));
    
    // Get main photo and other photos
    const mainPhoto = formData.get("main_photo");
    console.log("Main photo from formData:", mainPhoto);
    
    const photoFiles = formData.getAll("photos[]");
    
    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file) return null;
      console.log("File being uploaded:", file);
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "services",
        resource_type: "auto",
      });
      console.log("Cloudinary upload response:", uploadResponse);
      return uploadResponse.secure_url;
    };

    // Upload main photo
    const mainPhotoUrl = await uploadToCloudinary(mainPhoto);
    console.log("Main photo URL after upload:", mainPhotoUrl);

    if (!mainPhotoUrl) {
      throw new Error("Main photo is required");
    }

    // Upload all other photos in parallel
    const photoUrls = await Promise.all(
      photoFiles.map(file => uploadToCloudinary(file))
    ).then(urls => urls.filter(url => url !== null));

    if (photoUrls.length === 0) {
      throw new Error("At least one additional photo is required");
    }

    // Generate slug
    const slug = generateSlug(title);

    // Create service object
    const serviceData = {
      title,
      main_photo: mainPhotoUrl,
      subtitle,
      description,
      service_detail: serviceDetails,
      photos: photoUrls,
      slug
    };

    console.log("Service data being saved:", serviceData);

    const service = new Service(serviceData);
    console.log("Service model instance:", service);
    
    const savedService = await service.save();
    console.log("Saved service:", savedService);

    return {
      success: true,
      message: "Service added successfully!",
    };
  } catch (error) {
    console.error("Error creating service:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to add service"
    };
  }
}

export async function updateService(slug, formData) {
  try {
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const description = formData.get("description");
    const serviceDetails = JSON.parse(formData.get("service_detail"));
    const newMainPhoto = formData.get("main_photo");
    const newPhotoFiles = formData.getAll("photos[]");
    const keepExistingPhotos = formData.get("keep_existing_photos") === "true";

    const existingService = await Service.findOne({ slug });
    if (!existingService) {
      return { success: false, error: "Service not found" };
    }

    const uploadToCloudinary = async (file) => {
      if (!file || file.size === 0) return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;
      
      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "services",
        resource_type: "auto",
      });
      
      return uploadResponse.secure_url;
    };

    // Handle main photo - always replace if new one is provided
    let mainPhotoUrl = existingService.main_photo;
    if (newMainPhoto && newMainPhoto.size > 0) {
      mainPhotoUrl = await uploadToCloudinary(newMainPhoto);
    }

    // Handle other photos - replace all if new photos are provided
    let photoUrls = [];
    if (newPhotoFiles.length > 0) {
      // Replace all photos with new ones
      photoUrls = await Promise.all(
        newPhotoFiles.map(file => uploadToCloudinary(file))
      ).then(urls => urls.filter(url => url !== null));
    } else if (keepExistingPhotos) {
      // Keep existing photos if no new ones provided and keepExistingPhotos is true
      photoUrls = [...existingService.photos];
    }

    if (photoUrls.length === 0) {
      throw new Error("At least one photo is required");
    }

    const updatedServiceDetails = await Promise.all(
      serviceDetails.map(async (detail, index) => {
        const existingDetail = existingService.service_detail[index] || {};
        let detailPhotoUrls = [];
        
        const detailPhotoFiles = formData.getAll(`service_detail_${index}_photos[]`);
        
        if (detailPhotoFiles.length > 0) {
          // Replace with new photos if provided
          detailPhotoUrls = await Promise.all(
            detailPhotoFiles.map(file => uploadToCloudinary(file))
          ).then(urls => urls.filter(url => url !== null));
        } else if (keepExistingPhotos) {
          // Keep existing photos if no new ones provided
          detailPhotoUrls = [...(existingDetail.photo || [])];
        }

        return {
          ...detail,
          photo: detailPhotoUrls
        };
      })
    );

    const newSlug = title !== existingService.title ? generateSlug(title) : existingService.slug;

    const updateData = {
      title,
      subtitle,
      description,
      service_detail: updatedServiceDetails,
      main_photo: mainPhotoUrl,
      photos: photoUrls,
      slug: newSlug
    };

    const updatedService = await Service.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return { success: false, error: "Failed to update Service" };
    }

    const serviceObject = updatedService.toObject({
      versionKey: false,
      transform: (doc, ret) => {
        ret._id = ret._id.toString();
        if (ret.createdAt) ret.createdAt = ret.createdAt.toISOString();
        if (ret.updatedAt) ret.updatedAt = ret.updatedAt.toISOString();
        
        if (ret.service_detail) {
          ret.service_detail = ret.service_detail.map(detail => ({
            ...detail,
            _id: detail._id.toString(),
          }));
        }
        
        return ret;
      }
    });

    return {
      success: true,
      message: "Service updated successfully!",
      service: serviceObject
    };
  } catch (error) {
    console.error("Error updating service:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to update service"
    };
  }
}

export async function getServices() {
  try {
    const services = await Service.find().lean();
    
    // Serialize the services data
    const serializedServices = services.map(service => ({
      ...service,
      _id: service._id.toString(),
      service_detail: service.service_detail.map(detail => ({
        ...detail,
        _id: detail._id.toString()
      }))
    }));

    return { services: JSON.stringify(serializedServices), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getServiceDetails(slug) {
  try {
    const service = await Service.findOne({ slug }).lean();
    if (!service) {
      return { error: "Service not found", success: false };
    }

    // Serialize the service data
    const serializedService = {
      ...service,
      _id: service._id.toString(),
      service_detail: service.service_detail.map(detail => ({
        ...detail,
        _id: detail._id.toString()
      }))
    };

    return { service: JSON.stringify(serializedService), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function deleteService(id) {
  try {
    await Service.findByIdAndDelete(id);
    return { message: "Service deleted successfully", success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getMinimalServices() {
  try {
    const services = await Service.find()
      .select('title main_photo description slug _id')
      .lean();
    
    // Serialize the services data with only required fields
    const serializedServices = services.map(service => ({
      _id: service._id.toString(),
      title: service.title,
      main_photo: service.main_photo,
      description: service.description,
      slug: service.slug
    }));

    return { services: JSON.stringify(serializedServices), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getSubServices(slug, subId) {
  try {
    // Find the service that matches the slug and has a service_detail with matching subId
    const service = await Service.findOne({ 
      slug,
      'service_detail._id': subId
    })
    .select('service_detail.$') // Use $ positional operator to get only the matching element
    .lean();

    console.log("Service found:", service);

    if (!service) {
      return { error: "Service not found", success: false };
    }

    // Since we used the positional operator, service_detail will contain only the matching item
    const serviceDetailItem = service.service_detail[0];

    if (!serviceDetailItem) {
      return { error: "Service detail not found", success: false };
    }

    // Serialize the data
    const serialized = {
      _id: service._id.toString(),
      service_detail: {
        ...serviceDetailItem,
        _id: serviceDetailItem._id.toString(),
        photo: serviceDetailItem.photo ? serviceDetailItem.photo.map(p => p) : []
      }
    };

    return { service: JSON.stringify(serialized), success: true };
  } catch (err) {
    console.error("Error in getSubServices:", err);
    return { error: err.message, success: false };
  }
}


export async function getServiceName() {
  try {
    const services = await Service.find()
      .select('title slug _id')
      .lean();
    
    // Serialize the services data with only required fields
    const serializedServices = services.map(service => ({
      _id: service._id.toString(),
      title: service.title,
      slug: service.slug
    }));

    return { services: JSON.stringify(serializedServices), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getGalleries() {
  try {
    const galleries = await Gallery.find().lean();
    console.log("Galleries:", galleries);
    return { galleries: JSON.stringify(galleries), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function getGalleryDetails(id) {
  try {
    const gallery = await Gallery.findById(id).lean();
    if (!gallery) {
      return { error: "Gallery not found", success: false };
    }
    return { gallery: JSON.stringify(gallery), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

export async function submitGallery(formData) {
  try {
   
    const galleryType = formData.get("galleryType");
    const title = formData.get("title");
    const image = formData.get("image");
    const subTitle = formData.get("subTitle");

    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file) {
        throw new Error("Image is required");
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "galleries",
        resource_type: "auto",
      });

      return uploadResponse.secure_url;
    };

    // Upload image
    const imageUrl = await uploadToCloudinary(image);

    // Create gallery object
    const galleryData = {
      galleryType,
      image: imageUrl,
      title,
      subTitle,
    };

    const gallery = new Gallery(galleryData);
    await gallery.save();

    return {
      success: true,
      message: "Gallery added successfully!",
    };
  } catch (error) {
    console.error("Error creating gallery:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to add gallery"
    };
  }
}

export async function updateGallery(id, formData) {
  try {
    const galleryType = formData.get("galleryType");
    const image = formData.get("image");
    const title = formData.get("title");
    const subTitle = formData.get("subTitle");
    // Find existing gallery
    const existingGallery = await Gallery.findById(id).lean();
    if (!existingGallery) {
      return { success: false, error: "Gallery not found" };
    }

    // Function to upload an image to Cloudinary
    const uploadToCloudinary = async (file) => {
      if (!file || file.size === 0) return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;
      
      const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: "galleries",
        resource_type: "auto",
      });
      
      return uploadResponse.secure_url;
    };

    // Upload new image if provided, otherwise keep existing one
    let imageUrl = existingGallery.image;
    if (image && image.size > 0) {
      imageUrl = await uploadToCloudinary(image);
    }

    const updateData = {
      galleryType,
      image: imageUrl,
      title,
      subTitle,
    };

    // Update the gallery
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedGallery) {
      return { success: false, error: "Failed to update gallery" };
    }

    // Convert to plain object and clean up
    const serializedGallery = updatedGallery.toObject();
    serializedGallery._id = serializedGallery._id.toString();
    delete serializedGallery.__v;

    return {
      success: true,
      message: "Gallery updated successfully!",
      gallery: serializedGallery,
    };
  } catch (error) {
    console.error("Error updating gallery:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to update gallery"
    };
  }
}

export async function deleteGallery(id) {
  try {
    await Gallery.findByIdAndDelete(id);
    return { message: "Gallery deleted successfully", success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}

//take the gallery images from the gallery collection and return the images as per the title , in that i want the fields only image and subTitle,_id
export async function getGalleryImages(title) {
  try {
    const galleryImages = await Gallery.find({ title }).select('image subTitle _id').lean();
    console.log("Gallery images:", galleryImages);
    console.log("Gallery images:", galleryImages);


    return { galleryImages: JSON.stringify(galleryImages), success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
}