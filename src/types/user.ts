import { AdapterUser } from 'next-auth/adapters';

interface HubfolioUser extends AdapterUser {
  uuid: string;
}
