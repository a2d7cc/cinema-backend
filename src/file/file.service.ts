import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileElementResponce } from './file.responce'

@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'default'
	): Promise<FileElementResponce[]> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)
		
		const res: FileElementResponce[] = []
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
			res.push({
				url: `/uploads/${folder}/${file.originalname}`,
				name: file.originalname,
			})
		}

		return res
	}
}
