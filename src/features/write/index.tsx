"use client";

import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    onSubmit: async (values) => {
      // Validasi ukuran thumbnail sebelum submit
      if (thumbnailError) {
        return; // Mencegah submit jika ada error ukuran
      }
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailReff = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const maxSize = 4.5 * 1024 * 1024; // 4.5 MB dalam bytes

      if (file.size > maxSize) {
        // Set error jika ukuran file melebihi batas
        setThumbnailError("Ukuran gambar lebih dari 4.5 MB");
        formik.setFieldValue("thumbnail", null);
        setSelectedImage("");

        // Reset input file
        if (thumbnailReff.current) {
          thumbnailReff.current.value = "";
        }
      } else {
        // Reset error jika ukuran file sesuai
        setThumbnailError(null);
        formik.setFieldValue("thumbnail", file);
        setSelectedImage(URL.createObjectURL(file));
      }
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    setThumbnailError(null);

    if (thumbnailReff.current) {
      thumbnailReff.current.value = "";
    }
  };

  return (
    <main className="container mx-auto max-w-5xl border px-4">
      <form className="mt-10 space-y-2" onSubmit={formik.handleSubmit}>
        {/* ... komponen form lainnya tetap sama ... */}

        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailReff}
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
          {thumbnailError && (
            <p className="text-xs text-red-500">{thumbnailError}</p>
          )}
        </div>

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

        <div className="flex justify-end">
          <Button
            type="submit"
            className="my-10"
            disabled={isPending || !!thumbnailError}
          >
            {isPending ? "Processing..." : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default WritePage;
