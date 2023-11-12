package com.school.informationsecurity.repository;

import com.school.informationsecurity.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = """
                select m, u, u2 from Message m
                    left join User u on m.sender.id = u.id
                    left join User u2 on m.receiver.id = u2.id
                        where (u.email = :sender and u2.email = :receiver) or (u.email = :receiver and u2.email = :sender)
                    order by m.date desc
        """)
    List<Message> getAllMessagesBySenderAndReceiver(String sender, String receiver);
}
