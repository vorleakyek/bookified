"use client";

import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const uploadSchema = z.object({
  pdfFile: z
    .any()
    .refine((file) => file instanceof File, "PDF file is required")
    .refine((file) => file?.type === "application/pdf", "Must be a PDF")
    .refine((file) => file?.size <= 50 * 1024 * 1024, "Max 50MB"),
  coverImage: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Cover image must be a file",
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Cover image must be an image",
    ),
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author Name is required"),
  voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const VOICE_OPTIONS = {
  male: [
    {
      id: "dave",
      name: "Dave",
      desc: "Young male, British-Essex, casual & conversational",
    },
    {
      id: "daniel",
      name: "Daniel",
      desc: "Middle-aged male, British, authoritative but warm",
    },
    { id: "chris", name: "Chris", desc: "Male, casual & easy-going" },
  ],
  female: [
    {
      id: "rachel",
      name: "Rachel",
      desc: "Young female, American, calm & clear",
    },
    {
      id: "sarah",
      name: "Sarah",
      desc: "Young female, American, soft & approachable",
    },
  ],
};

const UploadForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { voice: "rachel" },
  });

  const currentVoice = watch("voice");

  const onPdfChange = (file?: File) => {
    setPdfFile(file ?? null);
    setValue("pdfFile", file as unknown as File, { shouldValidate: true });
  };

  const onCoverChange = (file?: File) => {
    setCoverImage(file ?? null);
    setValue("coverImage", file as unknown as File, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: UploadFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Book upload data:", data);
    // TODO: call real upload API / synthesize flow.
  };

  return (
    <div className="new-book-wrapper">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div>
          <label className="form-label" htmlFor="pdf-upload">
            Book PDF File
          </label>
          <div
            className={`upload-dropzone ${pdfFile ? "upload-dropzone-uploaded" : ""}`}
            role="button"
            onClick={() => document.getElementById("pdf-upload")?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              document.getElementById("pdf-upload")?.click()
            }
            tabIndex={0}
          >
            <Upload className="upload-dropzone-icon" />
            {pdfFile ? (
              <>
                <p className="upload-dropzone-text">{pdfFile.name}</p>
                <button
                  type="button"
                  className="upload-dropzone-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPdfChange(undefined);
                  }}
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <p className="upload-dropzone-text">Click to upload PDF</p>
                <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
              </>
            )}
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => onPdfChange(e.target.files?.[0])}
            />
          </div>
          {errors.pdfFile && (
            <p className="text-red-600 mt-2">{errors.pdfFile.message}</p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="cover-upload">
            Cover Image (Optional)
          </label>
          <div
            className={`upload-dropzone ${coverImage ? "upload-dropzone-uploaded" : ""}`}
            role="button"
            onClick={() => document.getElementById("cover-upload")?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              document.getElementById("cover-upload")?.click()
            }
            tabIndex={0}
          >
            <ImageIcon className="upload-dropzone-icon" aria-hidden="true" />
            {coverImage ? (
              <>
                <p className="upload-dropzone-text">{coverImage.name}</p>
                <button
                  type="button"
                  className="upload-dropzone-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCoverChange(undefined);
                  }}
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <p className="upload-dropzone-text">
                  Click to upload cover image
                </p>
                <p className="upload-dropzone-hint">
                  Leave empty to auto-generate from PDF
                </p>
              </>
            )}
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onCoverChange(e.target.files?.[0])}
            />
          </div>
          {errors.coverImage && (
            <p className="text-red-600 mt-2">{errors.coverImage.message}</p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="ex: Rich Dad Poor Dad"
            className="form-input"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-600 mt-2">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            type="text"
            placeholder="ex: Robert Kiyosaki"
            className="form-input"
            {...register("author")}
          />
          {errors.author && (
            <p className="text-red-600 mt-2">{errors.author.message}</p>
          )}
        </div>

        <div>
          <p className="form-label">Choose Assistant Voice</p>
          <fieldset className="space-y-3">
            <legend className="text-sm text-[#555] mb-2">Male Voices</legend>
            <div className="voice-selector-options">
              {VOICE_OPTIONS.male.map((voice) => {
                const selected = currentVoice === voice.id;
                return (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${selected ? "voice-selector-option-selected" : "voice-selector-option-default"}`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...register("voice")}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-semibold">{voice.name}</p>
                      <p className="text-sm text-[#555]">{voice.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            <legend className="text-sm text-[#555] mb-2">Female Voices</legend>
            <div className="voice-selector-options">
              {VOICE_OPTIONS.female.map((voice) => {
                const selected = currentVoice === voice.id;
                return (
                  <label
                    key={voice.id}
                    className={`voice-selector-option ${selected ? "voice-selector-option-selected" : "voice-selector-option-default"}`}
                  >
                    <input
                      type="radio"
                      value={voice.id}
                      {...register("voice")}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-semibold">{voice.name}</p>
                      <p className="text-sm text-[#555]">{voice.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {errors.voice && (
            <p className="text-red-600 mt-2">{errors.voice.message}</p>
          )}
        </div>

        <button type="submit" className="form-btn" disabled={isSubmitting}>
          Begin Synthesis
        </button>
      </form>

      {isSubmitting && (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper bg-white">
            <div className="loading-shadow">
              <div className="loading-animation">
                <div className="w-12 h-12 border-4 border-[#663820] border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="loading-title">Synthesis in progress</h3>
              <div className="loading-progress">
                <div className="loading-progress-item">
                  <span className="loading-progress-status">
                    Preparing files...
                  </span>
                </div>
                <div className="loading-progress-item">
                  <span className="loading-progress-status">
                    Generating voice segments...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
