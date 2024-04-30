import aws from "aws-sdk";

const AWSS3Bucket = "mundocrypto-files";
const s3 = new aws.S3({
  region: "eu-central-1",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
});

const signedUrlExpireSeconds = 60 * 5;

const awsHelper = {
  fileUpload: async (
    file,
    folderName,
    imageName,
    fileExtension,
    bucket = AWSS3Bucket,
    isPublic = false
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: bucket,
          Key: folderName + "/" + imageName, // File name you want to save as in S3
          Body: file,
          ContentType: fileExtension,
        };
        if (isPublic) {
          params.ACL = "public-read";
        }
        
        await s3.upload(params, (err, data) => {
          console.log("err", err);
          if (err) {
            resolve({ success: false, err });
          }
          resolve({ success: true, data });
        });
      } catch (error) {
        console.log("error", error);
        resolve({ success: false });
      }
    });
  },
};

export default awsHelper;
