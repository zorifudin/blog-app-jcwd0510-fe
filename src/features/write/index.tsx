"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CreateBlogSchema } from "./schemas";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    validationSchema: CreateBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailReff = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];

      // Logika untuk memeriksa ukuran file
      const maxSizeInBytes = 4.5 * 1024 * 1024; // 4.5 MB
      if (file.size > maxSizeInBytes) {
        toast.error("Image size exceeds 4.5MB!"); // Tampilkan toast error
        return;
      }

      formik.setFieldValue("thumbnail", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");

    if (thumbnailReff.current) {
      thumbnailReff.current.value = "";
    }
  };

  return (
    <main className="container mx-auto max-w-5xl border px-4">
      <form className="mt-10 space-y-2" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.title && !!formik.errors.title ? (
            <p className="text-xs text-red-500">{formik.errors.title}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Input
            name="category"
            type="text"
            placeholder="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!!formik.touched.category && !!formik.errors.category ? (
            <p className="text-xs text-red-500">{formik.errors.category}</p>
          ) : null}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={5}
            style={{ resize: "none" }}
          />
          {!!formik.touched.description && !!formik.errors.description ? (
            <p className="text-xs text-red-500">{formik.errors.description}</p>
          ) : null}
        </div>

        <RichTextEditor
          label="Content"
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          isTouch={formik.touched.content}
          setError={formik.setFieldError}
          setTouch={formik.setFieldTouched}
        />

        {selectedImage && (
          <>
            <div className="relative h-[150px] w-[200px]">
              <Image
                src={selectedImage}
                alt="thumbnail"
                fill
                className="-z-10 object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={removeThumbnail}
            >
              Remove
            </Button>
          </>
        )}

        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailReff}
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {!!formik.touched.thumbnail && !!formik.errors.thumbnail ? (
            <p className="text-xs text-red-500">{formik.errors.thumbnail}</p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="my-10" disabled={isPending}>
            {isPending ? "Processing..." : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default WritePage;
