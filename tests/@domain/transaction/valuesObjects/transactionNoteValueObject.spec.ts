import { TransactionNoteValueObject } from '@domain/transaction'

describe('TransactionNoteValueObject', () => {
  it('Should create a valid note', () => {
    const transactionNote = TransactionNoteValueObject.create('one_valid_note')
    expect(transactionNote.isSuccess).toBe(true)
    expect(transactionNote.isFailure).toBe(false)
    expect(transactionNote.getResult().value).toBe('one_valid_note')
  })

  it('Should faile if provide string greatter than 144 char', () => {
    const transactionNote = TransactionNoteValueObject.create(`
    Veniam saepe consequuntur autem. Harum facere modi corporis nihil quae. Minus aliquid sit optio. Deleniti possimus enim quasi veritatis corporis tempora. 
    Architecto voluptas facilis aliquam reprehenderit sunt architecto. Dicta explicabo blanditiis. Quam consequuntur ad. 
    Reiciendis rem excepturi corporis et eius placeat dolores dolore eius. Esse beatae ea earum labore voluptatem reprehenderit eum rem numquam. Maxime nostrum aliquid minima commodi ipsam et ipsa. 
    Beatae maxime aut inventore fuga facere. Eligendi aut quo. Ea ex laborum mollitia quasi. Totam velit praesentium corporis totam laudantium doloribus expedita. 
    Vel sapiente ea consectetur possimus. Unde quo natus. Sequi mollitia ad ut ipsum ad porro eius. 
    Reprehenderit minus quasi quisquam ea corporis expedita officia sit repellendus. Sit hic quidem minima quae. Quo consequuntur nihil sit veritatis quo.
    `)
    expect(transactionNote.isSuccess).toBe(false)
    expect(transactionNote.isFailure).toBe(true)
    expect(transactionNote.error).toBe('Note value should be less than 144 char')
  })

  it('Should remove spaces at the beginning of the text and at the end', () => {
    const transactionNote = TransactionNoteValueObject.create(' spaces testing at note.     ')
    expect(transactionNote.isSuccess).toBe(true)
    expect(transactionNote.getResult().value).toBe('spaces testing at note.')
  })
})
