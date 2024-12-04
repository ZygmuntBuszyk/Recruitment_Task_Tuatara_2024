import axios from 'axios'
import { parseStringPromise } from 'xml2js'

export class NBPService {
    private readonly NBP_URL = 'https://static.nbp.pl/dane/stopy/stopy_procentowe.xml'
    private cachedRate: { rate: number; timestamp: Date } | null = null;
    private readonly CACHE_DURATION = 15 * 60 * 1000;

    async getReferenceRate(): Promise<number> {
        if (this.cachedRate && this.isCacheValid()) {
            return this.cachedRate.rate;
        }

        try {
            const response = await axios.get(this.NBP_URL)
            const result = await parseStringPromise(response.data)

            const refRate = result['stopy_procentowe']['tabela'][0]['pozycja'].find(
                (item: any) => item.$.id === 'ref'
            )
            const percentageRate = refRate['$']['oprocentowanie'];

            // Get the percentageRate value and convert it from "5,75" format to number
            const referenceRate = parseFloat(percentageRate.replace(',', '.'))

            this.cachedRate = {
                rate: referenceRate,
                timestamp: new Date()
            };

            return referenceRate
        } catch (error) {
            throw new Error('Failed to fetch NBP reference rate')
        }
    }

    private isCacheValid(): boolean {
        if (!this.cachedRate) return false;
        const now = new Date();

        const cacheAge = now.getTime() - this.cachedRate.timestamp.getTime();

        return cacheAge < this.CACHE_DURATION;
    }
}