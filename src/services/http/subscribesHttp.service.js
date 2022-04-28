import { HttpService } from '@/services/http/http.service'

export class SubscribesHttpService {
  constructor () {
    this.httpSevice = new HttpService()
  }

  async subscribe (email, currencyTags, recaptcha) {
    return await this.httpSevice.post('subscriptions', { email, currencyTags, recaptcha })
  }

  async unsubscribe (email, recaptcha) {
    return await this.httpSevice.post('subscriptions/cancellations', { email, recaptcha })
  }

  async confirmSubscribe (verificationKey) {
    return await this.httpSevice.post('subscriptions/confirmations', { verificationKey })
  }

  async confirmUnsubscribe (verificationKey) {
    return await this.httpSevice.post('subscriptions/cancellations/confirmations', { verificationKey })
  }

  async confirmUpdate (verificationKey) {
    return await this.httpSevice.post('subscriptions/updates/confirmations', { verificationKey })
  }
}
