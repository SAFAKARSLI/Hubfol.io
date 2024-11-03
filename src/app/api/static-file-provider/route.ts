import { s3Client } from '@/aws/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  const bucketName = searchParams.get('bucketName');

  if (!key || !bucketName) {
    return new Response('Bad Request', { status: 400 });
  }

  const file = await getObject(key, bucketName);

  return new Response(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${file?.name}"`,
      'Content-Type': 'application/octet-stream',
    },
  });
}

const getObject = async (key: string, bucketName: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const { Body, Metadata } = await s3Client.send(new GetObjectCommand(params));
  const byteArray = await Body?.transformToByteArray();
  if (!byteArray) {
    return;
  }
  const file = new File([byteArray], Metadata?.filename as string, {
    type: 'application/pdf',
  });
  return file;
};
