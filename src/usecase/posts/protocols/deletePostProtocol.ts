export interface DeletePostProtocol {
  execute(id: string): Promise<boolean>
}