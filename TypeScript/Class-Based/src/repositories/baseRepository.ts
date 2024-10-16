import {
  FilterQuery,
  Model,
  ObjectId,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

/**
 * BaseRepository is a generic class that provides basic CRUD operations for a given mongoose model.
 * It allows for finding all documents, finding documents by ID, and finding a single document by ID.
 *
 * @template T The type of the documents in the model.
 */
class BaseRepository<T> {
  /**
   * The mongoose model associated with this repository.
   */
  constructor(public model: Model<T>) {}

  /**
   * Finds all documents in the model.
   *
   * @returns A promise that resolves to an array of documents.
   */
  findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  /**
   * Finds documents by their ID.
   *
   * @param _id The ID of the document(s) to find.
   * @returns A promise that resolves to an array of documents.
   */
  findById(_id: ObjectId | Number): Promise<T | null> {
    return this.model.findById(_id);
  }

  /**
   * Finds a single document by its ID.
   *
   * @param _id The ID of the document to find.
   * @returns A promise that resolves to the document if found, otherwise null.
   */
  findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  /**
   * Finds a single document by its ID and updates it.
   *
   * @param filter The filter to apply to the update operation.
   * @param update The update to apply to the document.
   * @param options The options to apply to the update operation.
   * @returns A promise that resolves to the updated document if found, otherwise null.
   */
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions
  ) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  /**
   * Creates a new document in the model.
   *
   * @param doc The document to be created.
   * @param options The options to apply to the creation operation.
   * @returns A promise that resolves to the created document.
   */
  create(doc: T, options?: QueryOptions): Promise<T> {
    return this.model.create(doc, options) as Promise<T>;
  }
}

export default BaseRepository;
